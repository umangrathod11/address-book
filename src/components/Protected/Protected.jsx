import { getAuthHeaders } from '../../helpers/auth';
import { AUTH_HEADER_NAMES } from '../../constants/general';
import { useNavigate } from 'react-router-dom';

export const Protected = (props) => {
    const navigate = useNavigate();
    const authData = getAuthHeaders();
    if ( !authData[AUTH_HEADER_NAMES.TOKEN] ) {
        navigate('/login');
        return;
    } else {
        return props.children;
    }
}
