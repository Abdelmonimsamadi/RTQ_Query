import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./api/todos/todoApi";

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: (gdm) => gdm({}).concat([todoApi.middleware])
})