import './login.scss';
import Button from '../../components/button/Button';

export default function Login() {
    return (
        <main className='login bg-dark'>
            <section className='login__content'>
                <i className='fa fa-user-circle login__icon'></i>
                <h1 className='login__title'>Sign In</h1>
                <form className='login__form'>
                    <div className='input-wrapper'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' />
                    </div>
                    <div className='input-remember'>
                        <input type='checkbox' id='remember-me' />
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
