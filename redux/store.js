import { configureStore } from '@reduxjs/toolkit'

import TasksReducer from './TasksSlice'
import TomorrowTasksSlice from './TomorrowTasksSlice'

export default store = configureStore({
  reducer: {
    tasks: TasksReducer,
    tmrTasks: TomorrowTasksSlice
  }
})

