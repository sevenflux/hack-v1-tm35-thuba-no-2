import requests
import json
from config import DEEPSEEK_API_KEY, DEEPSEEK_API_URL, ANALYSIS_PROMPT

def analyze_pool_data(formatted_data):
    """
    使用DeepSeek API分析资金池数据
    
    Args:
        formatted_data: 格式化后的资金池数据字符串
        
    Returns:
        分析结果文本
    """
    if not DEEPSEEK_API_KEY:
        return "错误: 未找到DeepSeek API密钥。请检查.env文件配置。"
    
    # 准备完整的提示词
    prompt = ANALYSIS_PROMPT.format(pool_data=formatted_data)
    
    # 准备API请求
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    }
    
    payload = {
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "你是一个专业的区块链资金池风险分析师，精通Aave协议。"},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "max_tokens": 2000
    }
    
    try:
        # 发送API请求
        response = requests.post(DEEPSEEK_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        
        # 解析并返回结果
        result = response.json()
        if "choices" in result and len(result["choices"]) > 0:
            return result["choices"][0]["message"]["content"]
        else:
            return "分析未返回有效结果。"
            
    except requests.exceptions.RequestException as e:
        return f"API请求错误: {str(e)}"
    except Exception as e:
        return f"处理分析时发生错误: {str(e)}" 