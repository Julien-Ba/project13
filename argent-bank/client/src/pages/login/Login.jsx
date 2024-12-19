import './login.scss';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/features/auth';
import Button from '../../components/button/Button';
import { useState } from 'react';

export default function Login() {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await dispatch(
            loginUser({
                email: email,
                password: password,
            })
        );
        if (result.error) {
            console.error(result.payload);
        } else {
            setRedirectToProfile(true);
        }
    };

    if (redirectToProfile) {
        return <Navigate to='/profile' />;
    }

    return (
        <main className='login bg-dark'>
            <section className='login__content'>
                <i className='fa fa-user-circle login__icon'></i>
                <h1 className='login__title'>Sign In</h1>
                <form className='login__form' onSubmit={handleSubmit}>
                    {error && (
                        <div className='error-message' role='alert'>
                            {error}
                        </div>
                    )}
                    <div className='input-wrapper'>
                        <label htmlFor='email'>Username</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className='input-remember'>
                        <input type='checkbox' id='remember-me' name='remember-me' disabled={isLoading} />
                        <label htmlFor='remember-me'>Remember me</label>
                    </div>
                    <Button type='submit' className='form__btn--submit'>
                        Sign In
                    </Button>
                </form>
            </section>
        </main>
    );
}
