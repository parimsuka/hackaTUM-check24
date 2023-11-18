
export type CraftsmanResponse = {
  craftsmen: Craftsman[];
}

export type Craftsman = {
  id: number,
  name:  string,
  rankingScore: number,
}


export type AppResponse<T = unknown, Success = true> = { type: 'success' | 'error'; } &
  Success extends boolean ?
  (Success extends true ? { data: T; } : { error: string })
  :  { data?: T; error?: string }
