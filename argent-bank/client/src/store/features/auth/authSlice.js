import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';

const tokenStorage =
    sessionStorage.getItem('userToken') || localStorage.getItem('userToken');
const initialState = {
    token: tokenStorage,
    isAuthenticated: Boolean(tokenStorage),
    isLoading: false,
    isLoginOut: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoading = true;
            state.isLoginOut = true;
            sessionStorage.removeItem('userToken');
            state.isAuthenticated = false;
        },
        reinitAuth: (state) => {
            Object.keys(initialState).forEach((key) => {
                state[key] = initialState[key];
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.logout = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { logout, reinitAuth } = authSlice.actions;
export default authSlice.reducer;
