import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
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

export const setTaskStatus = createAsyncThunk(
  'task/setTaskStatus',
  async (payload, { getState }) => {
    const { taskId } = payload;
    let newListTasks = [];
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
    return newListTasks;
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (payload, { getState }) => {
    const { editedTask } = payload;
    const tasks = getState().tasks.listTasks;
    const newListTasks = tasks.concat();
    const index = newListTasks.findIndex(task => task.id === editedTask.id);
    newListTasks[index] = editedTask;
    await _storeTask(newListTasks);
    return newListTasks;
  }
);

const initialState = {
  listTasks: [],
  isLoading: false,
  isError: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
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
      .addCase(editTask.fulfilled, (state, action) => {
        state.listTasks = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        console.log('err', action.error.message);
      });
  },
});

export default tasksSlice.reducer;

export const tasksSelector = createSelector(
  state => state.tasks,
  tasks => {
    return tasks.listTasks;
  }
);
