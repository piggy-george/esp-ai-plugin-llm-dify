module.exports = {
    // 插件名字
    name: "esp-ai-plugin-llm-dify",
    // 插件类型 LLM | TTS | IAT
    type: "LLM",
    main({ devLog, device_id, is_pre_connect, llm_config, text, llmServerErrorCb, llm_init_messages = [], llm_historys = [], cb, llm_params_set, logWSServer, connectServerBeforeCb, connectServerCb, log }) {
        try {
            const { api_key, url = 'https://api.dify.ai/v1', ...other_config } = llm_config;
            if (!api_key) return log.error(`请配置 LLM 的 api_key 参数。`);

            // 预请求处理
            async function preConnect() {
                // 预连接逻辑，可以为空
            }
            if (is_pre_connect) {
                preConnect();
                return;
            }

            // 消息关闭标志
            let shouldClose = false;
            // 文本结构定义（固定写法）
            const texts = {
                all_text: "",
                count_text: "",
                index: 0,
            };

            // 保存会话ID
            let conversation_id = null;

            // 告诉框架要开始连接LLM服务了
            connectServerBeforeCb();

            async function main() {
                try {
                    // 构建消息历史
                    const messages = [
                        ...llm_init_messages,
                        ...llm_historys,
                        { "role": "user", "content": text }
                    ];

                    // 构建请求headers
                    const headers = {
                        'Authorization': `Bearer ${api_key}`,
                        'Content-Type': 'application/json'
                    };

                    // 构建请求体
                    const requestBody = {
                        inputs: {},
                        query: text,
                        response_mode: "streaming",
                        user: device_id
                    };

                    // 如果存在会话ID，添加到请求中
                    if (llm_params_set && llm_params_set.conversation_id) {
                        requestBody.conversation_id = llm_params_set.conversation_id;
                        conversation_id = llm_params_set.conversation_id;
                        devLog && log.llm_info('使用现有会话ID：', conversation_id);
                    }

                    // 发起请求
                    const response = await fetch(`${url}/chat-messages`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(requestBody)
                    });

                    if (!response.ok) {
                        throw new Error(`Dify API错误: ${response.status} ${response.statusText}`);
                    }

                    // 通知框架已连接到LLM服务
                    connectServerCb(true);

                    // 注册关闭函数
                    const controller = new AbortController();
                    logWSServer({
                        close: () => {
                            connectServerCb(false);
                            controller.abort();
                            shouldClose = true;
                        }
                    });

                    // 处理流式响应
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let first_response = true;

                    while (true) {
                        if (shouldClose) break;

                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        // 解析SSE格式的响应
                        const lines = chunk.split('\n').filter(line => line.trim() !== '');

                        for (const line of lines) {
                            if (line.startsWith('data:')) {
                                if (line.includes('[DONE]')) continue;

                                try {
                                    const data = JSON.parse(line.slice(5).trim());
                                    const chunk_text = data.answer || '';

                                    // 获取会话ID（通常在第一个响应中）
                                    if (first_response && data.conversation_id) {
                                        conversation_id = data.conversation_id;
                                        first_response = false;
                                        devLog && log.llm_info('获取到新会话ID：', conversation_id);
                                        
                                        // 通知框架保存会话ID
                                        cb({ 
                                            text, 
                                            texts, 
                                            chunk_text, 
                                            llm_params: { 
                                                conversation_id 
                                            } 
                                        });
                                    } else {
                                        devLog === 2 && log.llm_info('LLM 输出：', chunk_text);
                                        texts["count_text"] += chunk_text;
                                        cb({ text, texts, chunk_text });
                                    }
                                } catch (e) {
                                    // 忽略解析错误
                                    devLog && log.error('解析响应出错：', e);
                                }
                            }
                        }
                    }

                    if (shouldClose) return;

                    // 通知框架响应结束，并传递会话ID
                    cb({
                        text,
                        is_over: true,
                        texts,
                        shouldClose,
                        llm_params: conversation_id ? { conversation_id } : undefined
                    });

                    // 通知框架关闭了与LLM服务的连接
                    connectServerCb(false);

                    devLog && log.llm_info('===');
                    devLog && log.llm_info(texts["count_text"]);
                    devLog && log.llm_info('===');
                    devLog && log.llm_info('LLM connect close!\n');
                    conversation_id && devLog && log.llm_info('会话ID：', conversation_id);
                } catch (error) {
                    console.log(error);
                    llmServerErrorCb("Dify LLM 报错: " + error);
                    connectServerCb(false);
                }
            }

            main();

        } catch (err) {
            console.log(err);
            log.error("Dify LLM 插件错误：", err);
            connectServerCb(false);
        }
    }
} 