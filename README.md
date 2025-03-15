# ESP-AI Dify LLM Plugin

让 ESP-AI 支持 Dify API，实现与 Dify 平台的对话功能。这个插件可以让你轻松地将 Dify 的强大 AI 能力集成到 ESP-AI 中。

## 最新更新

- **v1.0.5**: 修复了与Dify API通信的问题，完善了请求格式，添加了必需的`inputs`字段
- **v1.0.4**: 增强了错误处理和调试功能
- **v1.0.3**: 添加了连续对话功能支持

## 特性

- 🚀 简单易用的 API 接口
- 💬 支持流式响应
- 📝 完整的对话历史支持
- 🧠 支持连续对话记忆功能
- 🔧 灵活的配置选项
- 🌐 支持自定义 API 地址
- ⚡ 高性能和可靠性
- 🛡️ 完整的错误处理机制
- 📊 支持调试日志

## 安装

在你的 ESP-AI 项目中执行以下命令：

```bash
npm install esp-ai-plugin-llm-dify-client
```

> **注意**: 包名为 `esp-ai-plugin-llm-dify-client`，但在配置 ESP-AI 时，插件名为 `esp-ai-plugin-llm-dify`。这是正常的，安装和引入时使用包名，配置时使用插件名。

## 快速开始

### 基础使用

```javascript
const espAi = require("esp-ai");

espAi({
    // ... 其他配置

    // 配置使用插件 - 注意这里使用的是插件名 "esp-ai-plugin-llm-dify"
    llm_server: "esp-ai-plugin-llm-dify",
    llm_config: {
        api_key: "app-xxx", // 你的 Dify API 密钥
        url: 'https://api.dify.ai/v1' // 可选，默认为 https://api.dify.ai/v1
    },

    // 引入插件 - 注意这里使用的是包名 "esp-ai-plugin-llm-dify-client"
    plugins: [
        require("esp-ai-plugin-llm-dify-client")
    ]
});
```

### 高级配置

```javascript
espAi({
    // 配置使用插件 - 注意这里使用的是插件名
    llm_server: "esp-ai-plugin-llm-dify",
    llm_config: {
        api_key: "app-xxx",
        url: 'https://api.dify.ai/v1',
        timeout: 30000, // 请求超时时间（毫秒）
        debug: true,    // 启用调试日志
    },
    // 引入插件 - 注意这里使用的是包名
    plugins: [
        require("esp-ai-plugin-llm-dify-client")
    ]
});
```