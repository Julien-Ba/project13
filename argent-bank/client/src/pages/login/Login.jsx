import './login.scss';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/features/auth';
import Button from '../../components/button/Button';

export default function Login() {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (formData) => {
        const result = await dispatch(
            loginUser({
                email: formData.get('email'),
                password: formData.get('password'),
            })
        );

        if (loginUser.fulfilled.match(result)) {
            return <Navigate to='/profile' />;
        } else {
            console.error(result.payload);
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
                        <input type='email' id='email' name='email' required disabled={isLoading} />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required disabled={isLoading} />
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
