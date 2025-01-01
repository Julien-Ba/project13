import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reinitAuth } from '../../store/features/auth';
import { useEffect } from 'react';

export function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading: isAuthLoading, isLoginOut } = useSelector((state) => state.auth);
    const { user, isLoading: isProfileLoading } = useSelector((state) => state.profile);
    const isLoading = isAuthLoading || isProfileLoading;

    useEffect(() => {
        if (isLoginOut) {
            // need to be set in the macro-task queue to allow the navigate to execute first
            setTimeout(() => {
                dispatch(reinitAuth());
            }, 0);
        }
    }, [dispatch, isLoginOut]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isLoginOut) {
        // is redirected by the Link in UserNavigation
        return <></>;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to='/login' />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
