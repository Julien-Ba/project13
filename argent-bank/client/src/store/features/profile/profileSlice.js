import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile } from './profileThunks';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.user = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProfile, clearError } = profileSlice.actions;
export default profileSlice.reducer;
