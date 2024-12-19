import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/features/auth';

export default function UserNavigation() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <NavLink to={'/profile'} className='main-nav-item'>
                <i className='main-nav-item-icon fa fa-user-circle'></i>
                <span className='main-nav-item-text'>{user.name}</span>
            </NavLink>
            <Link to={'/'} className='main-nav-item' onClick={() => dispatch(logout())}>
                <i className='main-nav-item-icon fa fa-sign-out'></i>
                <span className='main-nav-item-text'>Sign Out</span>
            </Link>
        </>
    );
}
