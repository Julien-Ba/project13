import { createSelector } from '@reduxjs/toolkit';

const selectAuth = (state) => state.auth;
const selectProfile = (state) => state.profile;

export const selectLoginStatus = createSelector([selectAuth, selectProfile], (auth, profile) => ({
    authLoading: auth.isLoading,
    authError: auth.error,
    profileLoading: profile.isLoading,
    profileError: profile.error,
}));
