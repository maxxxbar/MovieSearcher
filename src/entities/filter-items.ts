export interface FilterItems {
  year: string | undefined
  type: SearchTypes | undefined
}

export enum SearchTypes {
  MOVIE = 'movie',
  SERIES = 'series',
  EPISODE = 'episode',
}
