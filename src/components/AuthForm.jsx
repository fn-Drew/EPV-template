import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../reducers/credentialsReducer';

function DualForm({
    handleAccountCreation,
    handleLogin,
    toggleForm,
    setToggleForm,
}) {
    const dispatch = useDispatch();
    const credentials = useSelector(state => state.credentials);
    return (
        <form className="form" onSubmit={toggleForm.loginForm ? handleLogin : handleAccountCreation}>
            <div className="form-title">{toggleForm.loginForm ? 'Login' : 'Sign Up '} </div>
            <div className="input-group">
                <div className="input-label"> Username </div>
                <input
                    className="input"
                    type="text"
                    value={credentials.username}
                    name="Username"
                    onChange={({ target }) => dispatch(setCredentials({ ...credentials, username: target.value }))}
                />
            </div>
            <div className="input-group">
                <div className="input-label"> Password </div>
                <input
                    className="input"
                    type="password"
                    value={credentials.password}
                    name="Password"
                    onChange={({ target }) => dispatch(setCredentials({ ...credentials, password: target.value }))}
                />
            </div>
            <button className="form-submit" type="submit">
                {toggleForm.loginForm ? 'Login' : 'Sign Up '}
            </button>
            <div className="form-alt">
                {toggleForm.loginForm ? 'Don\'t have an account?' : 'Already have an account?'}
                <button
                    className="form-alt-link"
                    type="button"
                    onClick={() => {
                        setToggleForm({ loginForm: !toggleForm.loginForm, accountForm: !toggleForm.accountForm });
                    }}
                >
                    {toggleForm.loginForm ? 'Sign Up' : 'Login'}
                </button>
            </div>
        </form>
    );
}

DualForm.propTypes = {
    handleAccountCreation: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    setToggleForm: PropTypes.func.isRequired,
    toggleForm: PropTypes.shape({
        loginForm: PropTypes.bool.isRequired,
        accountForm: PropTypes.bool.isRequired,
    }).isRequired,
};

export default DualForm;
