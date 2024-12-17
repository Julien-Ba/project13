import { Link, NavLink } from 'react-router-dom';

export default function UserNavigation() {
    return (
        <>
            <NavLink to={'/profile'} className='main-nav-item'>
                <i className='main-nav-item-icon fa fa-user-circle'></i>
                <span className='main-nav-item-text'>Tony</span>
            </NavLink>
            <Link to={'/'} className='main-nav-item'>
                <i className='main-nav-item-icon fa fa-sign-out'></i>
                <span className='main-nav-item-text'>Sign Out</span>
            </Link>
        </>
    );
}
