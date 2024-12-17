import { NavLink } from 'react-router-dom';

export default function AuthNavigation() {
    return (
        <NavLink to={'/login'} className='main-nav-item'>
            <i className='main-nav-item-icon fa fa-user-circle'></i>
            <span className='main-nav-item-text'>Sign In</span>
        </NavLink>
    );
}
