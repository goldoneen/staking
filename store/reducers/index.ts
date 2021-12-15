
import { combineReducers } from '@reduxjs/toolkit'
import { tokenReducer } from './auth.reducer'

export const rootReducers = combineReducers({
	tokens: tokenReducer,
})
