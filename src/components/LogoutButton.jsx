import React from 'react';
import PropTypes from 'prop-types';

export default function LogoutButton({ handleLogout }) {
    return (
        <button className="button" type="button" onClick={handleLogout}>
            logout
        </button>
    )
}

LogoutButton.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};
