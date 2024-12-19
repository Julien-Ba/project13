import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
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

        localStorage.setItem('token', token);

        return {
            token: token,
        };
    } catch (error) {
        return rejectWithValue(`An error occurred during authentication: ${error}`);
    }
});
