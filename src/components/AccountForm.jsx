import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../reducers/credentialsReducer';


function AccountForm({
    handleAccountCreation,
    setToggleForm,
}) {
    const dispatch = useDispatch();
    const credentials = useSelector(state => state.credentials);
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

AccountForm.propTypes = {
    handleAccountCreation: PropTypes.func.isRequired,
    setToggleForm: PropTypes.func.isRequired,
};

export default AccountForm;
