import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading: isAuthLoading } = useSelector((state) => state.auth);
    const { user, isLoading: isProfileLoading } = useSelector((state) => state.profile);
    const isLoading = isAuthLoading || isProfileLoading;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to='/login' replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
