import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../reducers/credentialsReducer';

function AuthForm({
    handleAccountCreation,
    handleLogin,
    toggleForm,
    setToggleForm,
}) {
    const dispatch = useDispatch();
    const { username, password } = useSelector(state => state.credentials);
    return (
        <form className="form" onSubmit={toggleForm ? handleLogin : handleAccountCreation}>
            <div className="form-title">{toggleForm ? 'Login' : 'Sign Up '} </div>
            <div className="input-group">
                <div className="input-label"> Username </div>
                <input
                    className="input"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => dispatch(setCredentials({ username: target.value, password }))}
                />
            </div>
            <div className="input-group">
                <div className="input-label"> Password </div>
                <input
                    className="input"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => dispatch(setCredentials({ username, password: target.value }))}
                />
            </div>
            <button className="form-submit" type="submit">
                {toggleForm ? 'Login' : 'Sign Up '}
            </button>
            <div className="form-alt">
                {toggleForm ? 'Don\'t have an account?' : 'Already have an account?'}
                <button
                    className="form-alt-link"
                    type="button"
                    onClick={() => {
                        setToggleForm(!toggleForm);
                    }}
                >
                    {toggleForm ? 'Sign Up' : 'Login'}
                </button>
            </div>
        </form>
    );
}

AuthForm.propTypes = {
    handleAccountCreation: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    setToggleForm: PropTypes.func.isRequired,
    toggleForm: PropTypes.bool.isRequired,
};

export default AuthForm;
