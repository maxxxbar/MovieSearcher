import {LoadResultsActions} from '../actions/actions'
import {SearchResults} from '../../entities/search-results'
import {
  LOAD_RESULTS_FAILED,
  LOAD_RESULTS_STARTED,
  LOAD_RESULTS_SUCCESS,
  RESET_STORE,
} from '../action-types'
import rfdc from 'rfdc'

export interface ResultsState {
  loading: boolean
  error: null
  results: undefined | SearchResults
}

const clone = rfdc({proto: true})
const INITIAL_STATE: ResultsState = {
  loading: false,
  error: null,
  results: undefined,
}
export const resultsReducer = (
  state: ResultsState = INITIAL_STATE,
  action: LoadResultsActions,
) => {
  switch (action.type) {
    case LOAD_RESULTS_STARTED: {
      return {...state, loading: true}
    }
    case LOAD_RESULTS_FAILED: {
      return {...state, loading: false, error: action.payload}
    }
    case LOAD_RESULTS_SUCCESS: {
      action.payload.Search = Array.from(new Set(action.payload.Search))
      return {
        ...state,
        loading: false,
        error: null,
        results: state.results
          ? {
              ...state.results,
              Search: [
                ...clone(state.results.Search),
                ...action.payload.Search,
              ],
            }
          : action.payload,
      }
    }
    case RESET_STORE: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
