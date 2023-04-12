import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'records',
    initialState: { username: "", password: "" },
    reducers: {
        setCredentials(state, action) {
            return action.payload
        }
    }
})

export const { setCredentials, clearCredentials } = userSlice.actions

export default userSlice.reducer
