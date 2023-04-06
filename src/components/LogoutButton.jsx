import React from 'react';

export default function LogoutButton({ handleLogout, user }) {
    return user ? (
        <button className="button" type="button" onClick={handleLogout}>
            logout
        </button>
    ) : null;
}
