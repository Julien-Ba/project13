import { fetchProfile } from './profileThunks';

export const profileMiddleware = (store) => (next) => (action) => {
    if (action.type === 'auth/login/fulfilled') {
        const result = next(action);
        store.dispatch(fetchProfile());
        return result;
    }
    return next(action);
};
