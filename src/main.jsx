import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import userReducer from "./reducers/userReducer";
import credentialsReducer from "./reducers/credentialsReducer";
import notificationReducer from "./reducers/notificationReducer";

const queryClient = new QueryClient();

const store = configureStore({
    reducer: {
        user: userReducer,
        credentials: credentialsReducer,
        notification: notificationReducer,
        // filter: filterReducer,
    }
})

store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
