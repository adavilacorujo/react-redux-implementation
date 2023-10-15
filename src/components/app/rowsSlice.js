import { createSlice } from '@reduxjs/toolkit';

// Slice object
export const rowSlice = createSlice({
    name: "rows",
    initialState: [],
    reducers: {
        addRow: (state, action) => {
            return state.filter(row => row.id !== action.payload.id)
        },
        loadData: (state, action) => {
            return action.payload
        },
        modifyInstructions: (state, action) => {
            let modified = []
            state.map(row => {
                if (row.id === action.payload.id) {
                    row = {
                        ...row,
                        instructions: action.payload.instructions
                    }
                }
                modified.push(row)
            })
            return modified
        }
    }
})

// Selectors
export const selectAllRows = (state) => state.rows

// Exports
export const {
    addRow, 
    modifyInstructions,
    loadData,
} = rowSlice.actions

export default rowSlice.reducer