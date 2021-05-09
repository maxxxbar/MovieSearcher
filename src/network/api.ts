import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {SearchResults} from '../entities/search-results'
import {SearchQuery} from '../entities/search-query'

export class Api {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://www.omdbapi.com/',
      params: {apiKey: '1df17fd4'},
    })
  }

  async load({
    text,
    page,
    type,
    year,
  }: SearchQuery): Promise<AxiosResponse<SearchResults>> {
    return await this.axiosInstance.get<SearchResults>('', {
      params: {s: text, page: page, type: type, y: year},
    })
  }
}
