export default interface DeepseekAPI {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    }
    logprobs: string | null;
    finish_reason: string;
  }[],
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: {
      cached_details: number;
    }
    prompt_cache_hit_tokens: number;
    prompt_cache_miss_tokens: number;
  },
  system_fingerprint: string;
}