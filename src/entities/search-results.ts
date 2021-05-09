export interface SearchResults {
  Search: MovieItem[]
  TotalResult: number
  Response: boolean
  Error?: string
}

export interface MovieItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
