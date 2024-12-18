export default async function loginFormAction(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    //const rememberMe = formData.get('remember-me') === 'on';

    if (!email || !password) {
        return { error: 'Please fill in all fields' };
    }

    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message || 'Login failed' };
        }

        return {
            success: true,
            token: data.body.token,
            email,
        };
    } catch (error) {
        return { error: error.message || 'An error occurred during login' };
    }
}
