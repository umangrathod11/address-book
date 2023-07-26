import { getIsLoggedInFlag } from '../../helpers/auth';
import { Navigate } from 'react-router-dom';

export const Protected = (props) => {
    const isLoggedIn = getIsLoggedInFlag();
    const pathname = window.location.pathname;
    console.log('path name ', pathname);
    return isLoggedIn ? props.children : <Navigate to="/login" replace={true} />
}
