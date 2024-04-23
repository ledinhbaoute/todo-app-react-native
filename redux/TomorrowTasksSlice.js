import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _storeTomorrowTask, _retrieveTomorrowTasks } from "../features/storage";

export const fetchAllTmrTasks = createAsyncThunk(
    'tmrtasks/fetchAllTasks',
    async () => {
        const response = await _retrieveTomorrowTasks() || []
        return response
    },
)

export const updateTmrTasks = createAsyncThunk(
    'tmrtasks/updateTasks',
    async (tasks) => {
        await _storeTomorrowTask(tasks)
        return tasks
    },
)

const initialState = {
    listTasks: [],
    isLoading: false,
    isError: false,
}

const tomorrowTasksSlice = createSlice({
    name: "tmrtasks",
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
            .addCase(fetchAllTmrTasks.fulfilled, (state, action) => {
                state.listTasks = action.payload;
                console.log("action", action)
            })
            .addCase(fetchAllTmrTasks.rejected, (state, action) => {
                console.log('err', action)
            })
            .addCase(updateTmrTasks.fulfilled, (state, action) => {
                state.listTasks = action.payload;
                console.log('add new tomorrow task', action)
            })
            .addCase(updateTmrTasks.rejected, (state, action) => {
                console.log('err', action)
            })
    }
})

export const { addTask, markDone } = tomorrowTasksSlice.actions

export default tomorrowTasksSlice.reducer;

export const selectAllTasks = state => state.tasks.listTasks

export const selectTaskById = (state, taskId) => state.tasks.find(task => task.id === taskId)