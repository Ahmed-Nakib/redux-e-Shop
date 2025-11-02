import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    banners: [],
    isLoading: false,
    error: null
}
const bannerSlice = createSlice({
    name: "banners",
    initialState,
    extraReducers: () => {

    }
})


export default bannerSlice.reducer;