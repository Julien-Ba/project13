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

        const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${loginData.body.token}` },
            body: JSON.stringify({}),
        });

        const profileData = await profileResponse.json();
        if (!profileResponse.ok) {
            return rejectWithValue(profileData.message || 'Profile validation failed');
        }

        return {
            user: profileData.body,
            token: token,
        };
    } catch (error) {
        return rejectWithValue(`An error occurred during authentication: ${error}`);
    }
});
