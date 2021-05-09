import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {RootState} from '../store'
import {AnyAction} from 'redux'
import {Api} from '../../network/api'
import {
  LOAD_RESULTS_FAILED,
  LOAD_RESULTS_STARTED,
  LOAD_RESULTS_SUCCESS,
  RESET_STORE,
} from '../action-types'
import {SearchResults} from '../../entities/search-results'
import {SearchQuery} from '../../entities/search-query'

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>

export const loadResult = (query: SearchQuery): AppThunkType => {
  const api = new Api()
  return (dispatch: AppThunkDispatch) => {
    dispatch(loadResultStarted())
    api
      .load(query)
      .then(value => {
        if (value.data.Error) {
          dispatch(
            loadResultFailed(`Status ${value.status}\n ${value.data?.Error}`),
          )
        } else if (!value.data.Error && value.status === 200) {
          dispatch(loadResultSuccess(value.data))
        } else {
          dispatch(
            loadResultFailed(`Status ${value.status} \n ${value.data?.Error}`),
          )
        }
      })
      .catch(reason => {
        dispatch(loadResultFailed(reason.message))
      })
  }
}
const loadResultStarted = () => ({type: LOAD_RESULTS_STARTED} as const)
const loadResultFailed = (error: string) =>
  ({
    type: LOAD_RESULTS_FAILED,
    payload: error,
  } as const)
const loadResultSuccess = (searchResults: SearchResults) =>
  ({
    type: LOAD_RESULTS_SUCCESS,
    payload: searchResults,
  } as const)

export const resetStore = () => ({type: RESET_STORE} as const)
export type LoadResultsActions =
  | ReturnType<typeof loadResultStarted>
  | ReturnType<typeof loadResultFailed>
  | ReturnType<typeof loadResultSuccess>
  | ReturnType<typeof resetStore>
