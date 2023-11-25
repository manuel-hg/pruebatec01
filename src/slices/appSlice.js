import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token:""
}
export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setToken:(state, action) =>  {state.token = action.payload}
    }
})

export const { setToken } = navSlice.actions
export const selectToken = (state) => state.navApp.token

export default navSlice.reducer