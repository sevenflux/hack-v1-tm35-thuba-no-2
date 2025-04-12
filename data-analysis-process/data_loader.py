import json
from config import TARGET_TOKENS

def load_data(file_path):
    """
    加载JSON数据文件
    
    Args:
        file_path: JSON文件路径
        
    Returns:
        加载的JSON数据
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        return data
    except Exception as e:
        print(f"加载数据文件时出错: {e}")
        return None

def filter_target_pools(data):
    """
    筛选关注的目标资金池数据
    
    Args:
        data: 完整的资金池数据列表
        
    Returns:
        筛选后的目标资金池数据
    """
    if not data:
        return []
    
    filtered_data = []
    for pool in data:
        if pool.get("symbol") in TARGET_TOKENS:
            filtered_data.append(pool)
    
    return filtered_data

def format_pool_data(pool_data):
    """
    格式化资金池数据，提取关键信息
    
    Args:
        pool_data: 筛选后的资金池数据
        
    Returns:
        格式化后的数据字符串，用于AI分析
    """
    formatted_data = []
    
    for pool in pool_data:
        pool_info = {
            "代币": pool.get("symbol", ""),
            "名称": pool.get("name", ""),
            "价格(USD)": pool.get("priceInUSD", ""),
            "总流动性(USD)": pool.get("totalLiquidityUSD", ""),
            "可用流动性(USD)": pool.get("availableLiquidityUSD", ""),
            "总债务(USD)": pool.get("totalDebtUSD", ""),
            "使用率": pool.get("borrowUsageRatio", ""),
            "抵押率(LTV)": pool.get("formattedBaseLTVasCollateral", ""),
            "清算阈值": pool.get("formattedReserveLiquidationThreshold", ""),
            "清算奖励": pool.get("formattedReserveLiquidationBonus", ""),
            "供应APY": pool.get("supplyAPY", ""),
            "借款APY": pool.get("variableBorrowAPY", ""),
            "借款上限(USD)": pool.get("borrowCapUSD", ""),
            "供应上限(USD)": pool.get("supplyCapUSD", ""),
            "供应使用率": pool.get("supplyUsageRatio", ""),
            "供应利率": pool.get("supplyAPR", ""),
            "借款利率": pool.get("variableBorrowAPR", ""),
            "是否冻结": pool.get("isFrozen", ""),
            "是否激活": pool.get("isActive", ""),
            "无抵押资产": pool.get("unbackedUSD", ""),
            "协议收入": pool.get("accruedToTreasury", "")
        }
        
        formatted_data.append(pool_info)
    
    return json.dumps(formatted_data, indent=2, ensure_ascii=False) 