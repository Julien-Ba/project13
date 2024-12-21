import './login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/features/auth';
import { selectLoginStatus } from '../../store/selectors/statusSelectors';
import Button from '../../components/button/Button';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authLoading, authError, profileLoading, profileError } = useSelector(selectLoginStatus);
    const isLoading = authLoading || profileLoading;
    const error = authError || profileError;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(
            loginUser({
                email: email,
                password: password,
            })
        );
        if (!error) {
            navigate('/profile');
        }
    };

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
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div className='input-remember'>
                        <input type='checkbox' id='remember-me' />
                        <label htmlFor='remember-me'>Remember me</label>
                    </div>
                    <Button type='submit' className='form__btn--submit' disabled={isLoading}>
                        Sign In
                    </Button>
                </form>
            </section>
        </main>
    );
}
