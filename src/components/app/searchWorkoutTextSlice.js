import { createSlice } from '@reduxjs/toolkit';

// Slice object
export const searchWorkoutText = createSlice({
    name: "searchWorkoutText",
    initialState: '',
    reducers: {
        setWorkoutText: (state, action) => {
            return action.payload
        }
    }
})

// Selectors
export const selectWorkoutText = (state) => state.searchWorkoutText

// Exports
export const {
    setWorkoutText
} = searchWorkoutText.actions

export default searchWorkoutText.reducer
