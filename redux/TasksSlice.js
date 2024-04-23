import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _storeTask, _retrieveTasks } from "../features/storage";

export const fetchAllTasks = createAsyncThunk(
    'tasks/fetchAllTasks',
    async () => {
        const response = await _retrieveTasks() || []
        return response
    },
)

export const updateTasks = createAsyncThunk(
    'tasks/updateTasks',
    async (tasks) => {
        await _storeTask(tasks)
        return tasks
    },
)

const initialState = {
    listTasks: [],
    isLoading: false,
    isError: false,
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state, action) {
            state.listTasks.push(action.payload)
        },
        markDone(state, action) {
            const { id } = action.payload
            const existingTask = state.listTasks.find(task => task.id === id)
            console.log(existingTask)
            if (existingTask) {
                existingTask.isDone = true
                console.log(existingTask)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.listTasks = action.payload;
                // console.log(action)
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                console.log('err', action)
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                state.listTasks = action.payload;
                console.log('add new task', action)
            })
            .addCase(updateTasks.rejected, (state, action) => {
                console.log('err', action)
            })
    }
})

export const { addTask, markDone } = tasksSlice.actions

export default tasksSlice.reducer;

export const selectAllTasks = state => state.tasks.listTasks

export const selectTaskById = (state, taskId) => state.tasks.find(task => task.id === taskId)