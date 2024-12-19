import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        // Login request
        const loginResponse = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();
        if (!loginResponse.ok || !loginData.token) {
            return rejectWithValue(loginData.message || 'Login failed');
        }
        localStorage.setItem('token', loginData.token);

        // Token validation and profile fetch
        const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: loginData.token }),
        });

        const profileData = await profileResponse.json();
        if (!profileResponse.ok) {
            return rejectWithValue(profileData.message || 'Profile validation failed');
        }

        return {
            user: profileData.body,
            token: loginData.token,
        };
    } catch (error) {
        return rejectWithValue(`An error occurred during authentication: ${error}`);
    }
});
