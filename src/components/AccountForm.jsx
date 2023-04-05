import React from 'react';

function CreateAccountForm({
    handleAccountCreation,
    credentials,
    setCredentials,
    setToggleForm,
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
                    Create Account
                </button>
                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        setToggleForm({ loginForm: true, accountForm: false });
                    }}
                >
                    Already have an account?
                </button>
            </form>
        </>
    );
}

export default CreateAccountForm;
