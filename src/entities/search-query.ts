import {SearchTypes} from './filter-items'

export type SearchQuery = {
  text: string
  page?: number
  type?: SearchTypes
  year?: string
}
