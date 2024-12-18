import './login.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/features/userSlice';
import loginFormAction from '../../service/authService';
import Button from '../../components/button/Button';

export default function Login() {
    const dispatch = useDispatch();
    const [state, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            const result = await loginFormAction(prevState, formData);
            if (result.success) {
                dispatch(
                    login({
                        user: {
                            email: result.email,
                            token: result.token,
                        },
                    })
                );
            }
            return result;
        },
        {
            error: null,
            success: false,
            token: null,
            email: null,
        }
    );

    return (
        <main className='login bg-dark'>
            <section className='login__content'>
                <i className='fa fa-user-circle login__icon'></i>
                <h1 className='login__title'>Sign In</h1>
                <form className='login__form' action={formAction}>
                    {state.error && (
                        <div className='error-message' role='alert'>
                            {state.error}
                        </div>
                    )}
                    <div className='input-wrapper'>
                        <label htmlFor='email'>Username</label>
                        <input type='email' id='email' name='email' required disabled={isPending} />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' required disabled={isPending} />
                    </div>
                    <div className='input-remember'>
                        <input type='checkbox' id='remember-me' name='remember-me' disabled={isPending} />
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
