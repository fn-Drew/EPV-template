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
        <>
            <div> Dual Form </div>
            {toggleForm.loginForm ? <div> Login </div> : <div> Create Account </div>}
            {/* CHANGE  */}
            <form className="form" onSubmit={toggleForm.loginForm ? handleLogin : handleAccountCreation}>
                <div>
                    username
                    <input
                        className="input"
                        type="text"
                        value={credentials.username}
                        name="Username"
                        onChange={({ target }) => dispatch(setCredentials({ ...credentials, username: target.value }))}
                    />
                </div>
                <div>
                    password
                    <input
                        className="input"
                        type="password"
                        value={credentials.password}
                        name="Password"
                        onChange={({ target }) => dispatch(setCredentials({ ...credentials, password: target.value }))}
                    />
                </div>
                <button className="button" type="submit">
                    {toggleForm.loginForm ? 'Login' : 'Create Account'}
                </button>
                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        // CHANGE
                        setToggleForm({ loginForm: !toggleForm.loginForm, accountForm: !toggleForm.accountForm });
                    }}
                >
                    {/* CHANGE  */}
                    Already have an account?
                </button>
            </form>
        </>
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
