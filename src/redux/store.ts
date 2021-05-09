import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {resultsReducer} from './reducers/reducer'

export type RootState = ReturnType<typeof store.getState>
const reducers = combineReducers({
  results: resultsReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))
