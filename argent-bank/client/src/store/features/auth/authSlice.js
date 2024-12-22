import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';

const tokenStorage = sessionStorage.getItem('userToken') || localStorage.getItem('userToken');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: tokenStorage,
        isAuthenticated: Boolean(tokenStorage),
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem('userToken');
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
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
