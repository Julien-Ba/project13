import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reinitAuth } from '../../store/features/auth';

export function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading: isAuthLoading, isLoginOut } = useSelector((state) => state.auth);
    const { user, isLoading: isProfileLoading } = useSelector((state) => state.profile);
    const isLoading = isAuthLoading || isProfileLoading;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        if (isLoginOut) {
            dispatch(reinitAuth());
            return <Navigate to='/' />;
        } else {
            return <Navigate to='/login' />;
        }
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
