import { createSlice } from '@reduxjs/toolkit';

// Slice object
export const searchMuscleText = createSlice({
    name: "searchMuscleText",
    initialState: [],
    reducers: {
        addMuscleFilter: (state, action) => {
            if (state.includes(action.payload) === false) state.push(action.payload)
        },
        removeMuscleFilter: (state, action) => {
            return state.filter(muscle => muscle !== action.payload)
        },
        setMuscleFilter: (state, action) => {
            return action.payload
        }
    }
})

// Selectors
export const selectMuscleText = (state) => state.searchMuscleText

// Exports
export const {
    addMuscleFilter,
    removeMuscleFilter,
    setMuscleFilter
} = searchMuscleText.actions

export default searchMuscleText.reducer
