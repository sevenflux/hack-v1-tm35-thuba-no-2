import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# DeepSeek API配置
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

# 关注的资金池代币
TARGET_TOKENS = ["WETH", "wstETH", "WBTC", "USDT", "USDC"]

# 分析提示词
ANALYSIS_PROMPT = """
你是一个专业的区块链资金池风险分析师。请根据以下Aave资金池数据，分析当前的风险状况：

{pool_data}

请重点分析以下几个方面：
1. 当前流动性状况及健康程度
2. 抵押率和清算阈值分析
3. 借贷利率及使用率评估
4. 潜在的风险因素和预警信号
5. 对投资者的建议

请以专业、简洁的方式呈现分析结果。
""" 