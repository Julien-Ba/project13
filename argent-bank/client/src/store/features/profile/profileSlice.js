import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, editProfile } from './profileThunks';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        error: null,
        user: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.user = null;
            state.error = null;
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
                console.log(action.payload);
                state.user = action.payload;
                state.isLoading = false;
                console.log(state.user);
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(editProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user.firstName = action.payload.firstName;
                state.user.lastName = action.payload.lastName;
                state.isLoading = false;
                console.log(state.user);
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { clearProfile, clearError } = profileSlice.actions;
export default profileSlice.reducer;
