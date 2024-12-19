import './header.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/argentBankLogo.png';
import AuthNavigation from './navigation/AuthNavigation';
import UserNavigation from './navigation/UserNavigation';

export default function Header() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return (
        <header>
            <nav className='main-nav'>
                <Link to={'/'} className='main-nav-logo'>
                    <img className='main-nav-logo-image' src={logo} alt='Argent Bank Logo' />
                    <h1 className='sr-only'>Argent Bank</h1>
                </Link>
                <div>{isAuthenticated ? <UserNavigation /> : <AuthNavigation />}</div>
            </nav>
        </header>
    );
}
