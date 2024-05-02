import { configureStore } from '@reduxjs/toolkit';

import TasksReducer from './TasksSlice';

export default store = configureStore({
  reducer: {
    tasks: TasksReducer,
  },
});
