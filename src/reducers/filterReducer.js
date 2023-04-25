import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            const filter = action.payload
            const sanitizedFilter = filter.replaceAll(/[&/\\#,+()$~%.^'":*?<>{}]/g, "");
            return sanitizedFilter
        },
    }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
