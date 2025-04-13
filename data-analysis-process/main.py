import os
import argparse
from data_loader import load_data, filter_target_pools, format_pool_data
from ai_analyzer import analyze_pool_data

def main():
    """
    主程序入口，整合数据加载和AI分析功能
    """
    # 解析命令行参数
    parser = argparse.ArgumentParser(description='Aave资金池风险分析工具')
    parser.add_argument('--data', type=str, default='data.json', help='数据文件路径 (默认: data.json)')
    parser.add_argument('--output', type=str, default='analysis_result.txt', help='分析结果输出文件 (默认: analysis_result.txt)')
    args = parser.parse_args()
    
    print(f"正在加载数据文件: {args.data}")
    # 加载数据
    data = load_data(args.data)
    if not data:
        print("数据加载失败，请检查文件路径和格式。")
        return
    
    print(f"数据加载成功，共 {len(data)} 条记录")
    
    # 筛选目标资金池
    filtered_data = filter_target_pools(data)
    print(f"已筛选出 {len(filtered_data)} 个目标资金池")
    
    if not filtered_data:
        print("未找到目标资金池数据。")
        return
    
    # 格式化数据
    formatted_data = format_pool_data(filtered_data)
    
    # 使用AI分析数据
    print("正在使用AI进行分析...")
    analysis_result = analyze_pool_data(formatted_data)
    
    # 输出分析结果
    print("\n======== 分析结果 ========")
    print(analysis_result)
    
    # 保存结果到文件
    with open(args.output, 'w', encoding='utf-8') as f:
        f.write(analysis_result)
    
    print(f"\n分析结果已保存到: {args.output}")

if __name__ == "__main__":
    main() 