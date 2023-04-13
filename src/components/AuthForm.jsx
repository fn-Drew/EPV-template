import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import AccountForm from './AccountForm'

export default function AuthForm(
    {
        handleLogin,
        handleAccountCreation,
        toggleForm,
        setToggleForm
    }) {
    return (
        <>
            {
                toggleForm.loginForm ? (
                    <LoginForm
                        handleLogin={handleLogin}
                        setToggleForm={setToggleForm}
                    />
                ) : null
            }
            {
                toggleForm.accountForm ? (
                    <AccountForm
                        handleAccountCreation={handleAccountCreation}
                        setToggleForm={setToggleForm}
                    />
                ) : null
            }
        </>
    )
}

AuthForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleAccountCreation: PropTypes.func.isRequired,

    toggleForm: PropTypes.shape({
        loginForm: PropTypes.bool.isRequired,
        accountForm: PropTypes.bool.isRequired,
    }).isRequired,

    setToggleForm: PropTypes.func.isRequired,
};
