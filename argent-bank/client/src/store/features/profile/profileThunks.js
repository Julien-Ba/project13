import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { getState, rejectWithValue }) => {
    const state = getState();

    if (!state.auth.isAuthenticated) {
        throw new Error('Not authenticated');
    }

    try {
        const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.auth.token}`,
            },
            body: JSON.stringify({}),
        });

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
            return rejectWithValue(profileData.message || 'Profile validation failed');
        }

        return profileData.body;
    } catch (error) {
        return rejectWithValue(`An error occurred during authentication: ${error}`);
    }
});

export const editProfile = createAsyncThunk(
    'profile/editProfile',
    async ({ newFirstName, newLastName }, { getState, rejectWithValue }) => {
        const state = getState();

        if (!state.auth.isAuthenticated) {
            throw new Error('Not authenticated');
        }

        try {
            const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${state.auth.token}`,
                },
                body: JSON.stringify({ newFirstName, newLastName }),
            });

            const profileData = await profileResponse.json();

            if (!profileResponse.ok) {
                return rejectWithValue(profileData.message || 'Profile validation failed');
            }

            return { firstName: newFirstName, lastName: newLastName };
        } catch (error) {
            return rejectWithValue(`An error occurred during authentication: ${error}`);
        }
    }
);
