import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';

const tokenStorage = sessionStorage.getItem('userToken') || localStorage.getItem('userToken');
const initialState = {
    token: tokenStorage,
    isAuthenticated: Boolean(tokenStorage),
    isLoading: false,
    logout: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem('userToken');
            state.logout = true;
            state.isAuthenticated = false;
            state.error = null;
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

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
