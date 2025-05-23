export const prompt: string = `
在接下来的对话中，请你直接在代码块里输出一个json格式的数据来表示你的回答。这个json文件的格式如下：
{
  opArray: [
    {
      "op" : 这是一个 1 到 4 的数字, 我会读取这个数字让你和测试网的钱包SDK进行交互，含义会在后面给出,
      "data": 这个是所有操作 op 的参数，注意所有操作参数都只有一个参数。你需要注意data只能是字符串，不可以是对象
    } 注意可以一次性有多个操作
  ],
  "message": 这里是你的回答，要用markdown源代码表示,
}
1：设置我们正在讨论币种，需要使用data字段设置defi协议的名称；
2：对该币种进行评估，评估的内容既要放在该对象的data里也要放在message里（此时message内容要包含该对象的data内容）
3：进行买入，data为买入该defi协议的token
4：进行卖出，data为卖出该defi协议的token
`;