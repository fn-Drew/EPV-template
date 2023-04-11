import React from 'react'
import LoginForm from './LoginForm'
import AccountForm from './AccountForm'

export default function AuthForm(
    {
        handleLogin,
        handleAccountCreation,
        credentials,
        setCredentials,
        toggleForm,
        setToggleForm
    }) {
    return (
        <>
            {
                toggleForm.loginForm ? (
                    <LoginForm
                        handleLogin={handleLogin}
                        credentials={credentials}
                        setCredentials={setCredentials}
                        setToggleForm={setToggleForm}
                    />
                ) : null
            }
            {
                toggleForm.accountForm ? (
                    <AccountForm
                        handleAccountCreation={handleAccountCreation}
                        credentials={credentials}
                        setCredentials={setCredentials}
                        setToggleForm={setToggleForm}
                    />
                ) : null
            }
        </>
    )
}
