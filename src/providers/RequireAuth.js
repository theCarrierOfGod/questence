import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return children
}
