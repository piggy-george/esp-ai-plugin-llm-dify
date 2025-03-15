# ESP-AI Dify LLM Plugin

让 ESP-AI 支持 Dify API，实现与 Dify 平台的对话功能。这个插件可以让你轻松地将 Dify 的强大 AI 能力集成到 ESP-AI 中。

## 最新更新

- **v1.0.6**: 增强与Dify API的兼容性，添加更多请求头，优化URL处理，增强错误日志
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

## 快速开始

### 基础使用

```javascript
const espAi = require("esp-ai");

espAi({
    // ... 其他配置

    // 配置使用插件并且为插件配置 api-key
    llm_server: "esp-ai-plugin-llm-dify",
    llm_config: {
        api_key: "app-xxx", // 你的 Dify API 密钥
        url: 'https://api.dify.ai/v1' // 可选，默认为 https://api.dify.ai/v1
    },

    // 引入插件
    plugins: [
        require("esp-ai-plugin-llm-dify-client")
    ]
});
```

### 高级配置

```javascript
espAi({
    llm_server: "esp-ai-plugin-llm-dify",
    llm_config: {
        api_key: "app-xxx",
        url: 'https://api.dify.ai/v1',
        timeout: 30000, // 请求超时时间（毫秒）
        debug: true,    // 启用调试日志
    },
    plugins: [
        require("esp-ai-plugin-llm-dify-client")
    ]
});
```

## 连续对话功能

插件现在支持连续对话功能，可以保持对话的上下文记忆。这个功能是自动处理的：

- 首次对话时，插件会自动从 Dify 获取 `conversation_id`
- 后续对话会自动使用这个 ID，保持对话的连续性
- 不需要任何额外配置，插件会自动管理会话状态

## 配置参数

### llm_config 配置项

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| api_key | string | 是 | - | Dify 的 API 密钥 |
| url | string | 否 | https://api.dify.ai/v1 | Dify API 的基础 URL |
| timeout | number | 否 | 30000 | 请求超时时间（毫秒） |
| debug | boolean | 否 | false | 是否启用调试日志 |

## 错误处理

插件内置了完善的错误处理机制，会抛出以下类型的错误：

- `AuthenticationError`: API 认证错误
- `ValidationError`: 参数验证错误
- `APIError`: API 调用错误
- `TimeoutError`: 请求超时错误
- `NetworkError`: 网络连接错误

示例：

```javascript
try {
    // 你的代码
} catch (error) {
    if (error.name === 'AuthenticationError') {
        console.error('API 密钥无效');
    } else if (error.name === 'TimeoutError') {
        console.error('请求超时');
    }
}
```

## 开发说明

1. 克隆项目
```bash
git clone https://github.com/piggy-george/esp-ai-plugin-llm-dify.git
cd esp-ai-plugin-llm-dify
```

2. 安装依赖
```bash
npm install
```

3. 开发和测试
```bash
# 运行测试
npm test
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT

## 支持

如果你在使用过程中遇到任何问题，可以：

1. 查看 [Issue](https://github.com/piggy-george/esp-ai-plugin-llm-dify/issues) 是否有类似问题
2. 提交新的 [Issue](https://github.com/piggy-george/esp-ai-plugin-llm-dify/issues/new)
3. 通过 Pull Request 提交改进
