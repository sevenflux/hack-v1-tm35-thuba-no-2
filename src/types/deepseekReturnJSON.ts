export default interface DeepseekReturnJSON {
  opArray: {
    op: 1 | 2 | 3 | 4;
    data: string;
  }[];
  message: string;
}