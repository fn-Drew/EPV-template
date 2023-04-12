import { createSlice } from "@reduxjs/toolkit"
import recordService from "../services/records"

const recordSlice = createSlice({
    name: 'records',
    initialState: [],
    reducers: {
        appendRecord(state, action) {
            state.push(action.payload)
        },
        setRecords(state, action) {
            return action.payload
        },
    }
})

export const { appendRecord, setRecords } = recordSlice.actions

export const initialRecords = () =>
    async dispatch => {
        const records = await recordService.getAll()
        dispatch(setRecords(records))
    }

export const addRecord = (content, user) =>
    async dispatch => {
        const newRecord = await recordService.create(content, user)
        dispatch(appendRecord(newRecord))
    }

export default recordSlice.reducer
