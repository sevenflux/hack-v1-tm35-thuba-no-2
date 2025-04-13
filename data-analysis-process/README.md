# Aave资金池风险分析工具

这是一个基于DeepSeek AI的区块链资金池风险分析工具，主要面向Aave协议中的ETH、WBTC、USDT、USDC和wstETH资金池。

## 功能特点

1. 读取JSON格式的Aave资金池数据
2. 通过DeepSeek API进行智能风险分析
3. 生成专业的风险分析报告

## 项目结构

```
├── main.py             # 主程序入口
├── config.py           # 配置文件
├── data_loader.py      # 数据加载模块
├── ai_analyzer.py      # AI分析模块
├── .env                # 环境变量配置（API密钥）
├── requirements.txt    # 项目依赖
├── data.json           # 示例数据文件
└── README.md           # 项目说明
```

## 安装与配置

1. 克隆项目并安装依赖：

```bash
git clone <项目地址>
cd <项目目录>
pip install -r requirements.txt
```

2. 配置API密钥：

在项目根目录创建`.env`文件，并添加以下内容：

```
DEEPSEEK_API_KEY=your_api_key
```

## 使用方法

基本用法：

```bash
python main.py
```

自定义参数：

```bash
python main.py --data=your_data.json --output=your_result.txt
```

参数说明：
- `--data`: 指定数据文件路径（默认：data.json）
- `--output`: 指定分析结果输出文件（默认：analysis_result.txt）

## 数据格式

输入数据需为JSON格式，包含Aave资金池的详细信息。示例数据文件格式参考`data.json`。

## 注意事项

- DeepSeek API调用需要有效的API密钥
- 确保数据文件格式符合要求
- 分析结果将同时显示在控制台和保存到指定文件 


