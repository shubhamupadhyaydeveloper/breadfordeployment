import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    wishlist : [],
    logedIn : 'login',
    isUser : JSON.parse(localStorage.getItem('user'))
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
       addWishlist : (state , action) => {
        state.wishlist = [...state.wishlist , action.payload.item]
       } ,
       setLogedin : (state , action) => {
        state.logedIn = action.payload
       },
       setUser : (state , action) => {
        state.isUser = action.payload
       }
    }
})

export const {addWishlist , setLogedin , setUser} = userSlice.actions

export const userReducer = userSlice.reducer;