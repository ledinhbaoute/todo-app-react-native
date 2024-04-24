import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  _storeTask,
  _retrieveTasks,
  _storeTomorrowTask,
  _retrieveTomorrowTasks,
} from '../features/storage';

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async () => {
    const response = (await _retrieveTasks()) || [];
    return response;
  }
);

export const updateTasks = createAsyncThunk(
  'tasks/updateTasks',
  async tasks => {
    await _storeTask(tasks);
    return tasks;
  }
);

export const fetchAllTmrTasks = createAsyncThunk(
  'tasks/fetchAllTmrTasks',
  async () => {
    const response = (await _retrieveTomorrowTasks()) || [];
    return response;
  }
);

export const updateTmrTasks = createAsyncThunk(
  'tasks/updateTmrTasks',
  async tasks => {
    await _storeTomorrowTask(tasks);
    return tasks;
  }
);

export const setTaskStatus = createAsyncThunk(
  'task/setTaskStatus',
  async (payload, thunkAPI) => {
    const { taskId, tasks } = payload;
    const newListTasks = tasks.concat();
    const selectedTask = tasks.find(task => task.id === taskId);
    const index = newListTasks.findIndex(task => task.id === taskId);
    newListTasks[index] = {
      id: selectedTask.id,
      name: selectedTask.name,
      time: selectedTask.time,
      isDone: !selectedTask.isDone,
    };
    await _storeTask(newListTasks);
    return newListTasks;
  }
);

export const setTmrTaskStatus = createAsyncThunk(
  'task/setTmrTaskStatus',
  async (payload, thunkAPI) => {
    const { taskId, tmrTasks } = payload;
    const newListTasks = tmrTasks.concat();
    const selectedTask = tmrTasks.find(task => task.id === taskId);
    const index = newListTasks.findIndex(task => task.id === taskId);
    newListTasks[index] = {
      id: selectedTask.id,
      name: selectedTask.name,
      time: selectedTask.time,
      isDone: !selectedTask.isDone,
    };
    await _storeTomorrowTask(newListTasks);
    return newListTasks;
  }
);

const initialState = {
  listTasks: [],
  listTmrTasks: [],
  isLoading: false,
  isError: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.listTasks.push(action.payload);
    },
    markDone(state, action) {
      const { id } = action.payload;
      const existingTask = state.listTasks.find(task => task.id === id);
      console.log(existingTask);
      if (existingTask) {
        existingTask.isDone = true;
        console.log(existingTask);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.listTasks = action.payload;
        // console.log(action)
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        console.log('err', action);
      })
      .addCase(updateTasks.fulfilled, (state, action) => {
        state.listTasks = action.payload;
        console.log('add new task', action);
      })
      .addCase(updateTasks.rejected, (state, action) => {
        console.log('err', action);
      })
      .addCase(setTaskStatus.fulfilled, (state, action) => {
        state.listTasks = action.payload;
      })
      .addCase(setTaskStatus.rejected, (state, action) => {
        console.log('err', action);
      })
      .addCase(fetchAllTmrTasks.fulfilled, (state, action) => {
        state.listTmrTasks = action.payload;
        // console.log('action', action);
      })
      .addCase(fetchAllTmrTasks.rejected, (state, action) => {
        console.log('err', action);
      })
      .addCase(updateTmrTasks.fulfilled, (state, action) => {
        state.listTmrTasks = action.payload;
        console.log('add new tomorrow task', action);
      })
      .addCase(updateTmrTasks.rejected, (state, action) => {
        console.log('err', action);
      })
      .addCase(setTmrTaskStatus.fulfilled, (state, action) => {
        state.listTmrTasks = action.payload;
      })
      .addCase(setTmrTaskStatus.rejected, (state, action) => {
        console.log('err', action);
      });
  },
});

export const { addTask, markDone } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectAllTasks = state => state.tasks.listTasks;

export const selectTaskById = (state, taskId) =>
  state.tasks.find(task => task.id === taskId);
