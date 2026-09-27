import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { commentSlice } from "./slices/commentSlice";

// import postReducer from "../features/posts/postSlice"; // importing the postReducer created in PostSLice
// import userReducer from "../features/users/usersSlice";

// Here it will combine all the reducers & state into one global state object

export const store = configureStore({
        reducer: {
            [commentSlice.name]: commentSlice.reducer
        },
        devTools: true
    })

// export const wrapper = createWrapper(makeStore)

// export default makeStore