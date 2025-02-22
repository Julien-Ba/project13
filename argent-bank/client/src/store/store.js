import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import profileReducer from './features/profile/profileSlice';
import { profileMiddleware } from './features/profile/profileMiddleWare';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware();
        return middleware.concat(profileMiddleware);
    },
});
