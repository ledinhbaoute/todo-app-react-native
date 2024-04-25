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
  async (payload, { getState }) => {
    const { taskId, isToday } = payload;
    let newListTasks = [];
    if (isToday) {
      const tasks = getState().tasks.listTasks;
      newListTasks = tasks.concat();
      const selectedTask = tasks.find(task => task.id === taskId);
      const index = newListTasks.findIndex(task => task.id === taskId);
      newListTasks[index] = {
        id: selectedTask.id,
        name: selectedTask.name,
        time: selectedTask.time,
        isDone: !selectedTask.isDone,
      };
      await _storeTask(newListTasks);
    } else {
      const tasks = getState().tasks.listTmrTasks;
      newListTasks = tasks.concat();
      const selectedTask = tasks.find(task => task.id === taskId);
      const index = newListTasks.findIndex(task => task.id === taskId);
      newListTasks[index] = {
        id: selectedTask.id,
        name: selectedTask.name,
        time: selectedTask.time,
        isDone: !selectedTask.isDone,
      };
      await _storeTomorrowTask(newListTasks);
    }
    return { newListTasks, isToday };
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (payload, { getState }) => {
    const { editedTask, isToday } = payload;
    let newListTasks = [];
    if (isToday) {
      const tasks = getState().tasks.listTasks;
      newListTasks = tasks.concat();
      const index = newListTasks.findIndex(task => task.id === editedTask.id);
      newListTasks[index] = editedTask;
      await _storeTask(newListTasks);
    } else {
      const tasks = getState().tasks.listTmrTasks;
      newListTasks = tasks.concat();
      const index = newListTasks.findIndex(task => task.id === editedTask.id);
      newListTasks[index] = editedTask;
      await _storeTomorrowTask(newListTasks);
    }
    return { newListTasks, isToday };
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
        if (action.payload.isToday) {
          state.listTasks = action.payload.newListTasks;
        } else {
          state.listTmrTasks = action.payload.newListTasks;
        }
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
      .addCase(editTask.fulfilled, (state, action) => {
        if (action.payload.isToday)
          state.listTasks = action.payload.newListTasks;
        else state.listTmrTasks = action.payload.newListTasks;
      })
      .addCase(editTask.rejected, (state, action) => {
        console.log('err', action.error.message);
      });
  },
});

export const { addTask, markDone } = tasksSlice.actions;

export default tasksSlice.reducer;
