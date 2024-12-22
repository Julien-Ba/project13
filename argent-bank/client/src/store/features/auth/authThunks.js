import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password, rememberMe }, { rejectWithValue }) => {
        try {
            const loginResponse = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginResponse.json();
            const token = loginData.body.token;

            if (!loginResponse.ok || !token) {
                return rejectWithValue(loginData.message || 'Login failed');
            }

            if (rememberMe) {
                localStorage.setItem('useToken', token);
            } else {
                sessionStorage.setItem('useToken', token);
            }

            return {
                token: token,
            };
        } catch (error) {
            return rejectWithValue(`An error occurred during authentication: ${error}`);
        }
    }
);
