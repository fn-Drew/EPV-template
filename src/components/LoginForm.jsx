import React from 'react';


function LoginForm({
    handleLogin,
    credentials,
    setCredentials,
    setShowLoginForm,
    setShowAccountForm,
}) {
    return (
        <>
            <h1>Login</h1>
            <form className="form" onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        className="input"
                        type="text"
                        value={credentials.username}
                        name="Username"
                        onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}
                    />
                </div>
                <div>
                    password
                    <input
                        className="input"
                        type="password"
                        value={credentials.password}
                        name="Password"
                        onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}
                    />
                </div>
                <button className="button" type="submit">
                    login
                </button>
                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        setShowLoginForm(false);
                        setShowAccountForm(true);
                    }}
                >
                    Dont have an account?
                </button>
            </form>
        </>
    );
}

export default LoginForm;
