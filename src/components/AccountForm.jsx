import React from 'react';

function CreateAccountForm({
    handleAccountCreation,
    username,
    password,
    setUsername,
    setPassword,
    setShowLoginForm,
    setShowAccountForm,
}) {
    return (
        <>
            <h1>Create Account</h1>
            <form className="form" onSubmit={handleAccountCreation}>
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
                    Create Account
                </button>
                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        setShowLoginForm(true);
                        setShowAccountForm(false);
                    }}
                >
                    Already have an account?
                </button>
            </form>
        </>
    );
}

export default CreateAccountForm;
