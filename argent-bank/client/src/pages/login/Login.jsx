import './login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/features/auth';
import Button from '../../components/button/Button';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading: authLoading, error: authError } = useSelector((state) => state.auth);
    const { isLoading: profileLoading, error: profileError } = useSelector((state) => state.profile);
    const isLoading = authLoading || profileLoading;
    const error = authError || profileError;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginResult = await dispatch(
            loginUser({
                email: email,
                password: password,
            })
        );
        if (loginResult.error) {
            console.error(loginResult.payload);
        } else {
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
