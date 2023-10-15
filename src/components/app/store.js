// /** This function implements the createStore functino from 'redux' */
// const createStore = (reducer) => {
//     let state
//     let listeners

//     const getState = () => state

//     const dispatch = (action) => {
//         state = reducer(state, action)
//         listeners.forEach(listener => listener())
//     }

//     const subscribe = (listener) => {
//         listeners.push(listener)
//         /** Return a function that will allows the unsubscription of the 
//             subscriber */
//         return () => {
//             listeners = listeners.filter(l => l !== listener)
//         }
//     }
//     dispatch({})
//     return { getState, dispatch, subscribe }
// }

import { createStore, combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import rowReducer from './rowsSlice';
import workoutTextReducer from './searchWorkoutTextSlice';
import muscleTextReducer from './searchMuscleTextSlice'

export const store = configureStore({
    reducer: {
        rows: rowReducer,
        searchWorkoutText: workoutTextReducer,
        searchMuscleText: muscleTextReducer,
    }
})