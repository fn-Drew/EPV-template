import React from 'react';


function LoginForm({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
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
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        className="input"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
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
