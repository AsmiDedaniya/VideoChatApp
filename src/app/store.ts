import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AurhSlice";
import { meetingsSlice } from "./slices/MeetingSlice";


export const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        meeting:meetingsSlice.reducer,
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;