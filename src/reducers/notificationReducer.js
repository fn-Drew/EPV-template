import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            const notification = action.payload
            return notification
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { updateNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) =>
    async dispatch => {
        const time = timeout * 1000
        dispatch(updateNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    }

export default notificationSlice.reducer

