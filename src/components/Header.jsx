import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../App.css';

export default function Header({ handleLogout }) {
    const user = useSelector(state => state.user);
    return (
        <header className="header-container">
            <div className="header-title">
                Speech Analysis
            </div >
            <div className="header-user">
                <div className="header-username"> {user.username} </div>
                <button className="logout-button" type="button" onClick={handleLogout}>
                    logout
                </button>
            </div>
        </header >
    );
}

Header.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};
