# ESP-AI Dify LLM Plugin

让 ESP-AI 支持 Dify API，实现与Dify平台的对话功能。

## 安装

在你的 ESP-AI 项目中执行以下命令：

```bash
npm i esp-ai-plugin-llm-dify
```

## 使用方法

```javascript
const espAi = require("esp-ai");

espAi({
    // ... 其他配置

    // 配置使用插件并且为插件配置api-key
    llm_server: "esp-ai-plugin-llm-dify",
    llm_config: {
        api_key: "app-xxx", // 你的Dify API密钥
        url: 'https://api.dify.ai/v1' // 可选，默认为 https://api.dify.ai/v1
    },

    // 引入插件
    plugins: [
        require("esp-ai-plugin-llm-dify")
    ]
});
```

## 配置说明

### llm_config 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| api_key | string | 是 | Dify的API密钥 |
| url | string | 否 | Dify API的基础URL，默认为 https://api.dify.ai/v1 |

## 功能特性

- 支持流式响应
- 支持对话历史
- 支持自定义API地址
- 完整的错误处理
- 支持调试日志

## 开发说明

1. 克隆项目
```bash
git clone [项目地址]
cd esp-ai-plugin-llm-dify
```

2. 安装依赖
```bash
npm install
```

3. 开发和测试
```bash
# 编写代码
# 运行测试
npm test
```

## 许可证

MIT 