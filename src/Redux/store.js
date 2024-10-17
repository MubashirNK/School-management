import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import filtersReducer from '../features/filters/filtersSlice'
import rootReducer from './rootReducer'

export const store = configureStore({
  reducer:rootReducer 
})