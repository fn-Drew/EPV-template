import React from 'react';

export default function LogoutButton({ handleLogout }) {
    return (
        <button className="button" type="button" onClick={handleLogout}>
            logout
        </button>
    );
}
