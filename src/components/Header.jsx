import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';

function ProfilePicture() {
    return (
        <img
            className="header-pfp"
            alt="pfp"
            src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        />
    )
}

function Logo() {
    return (
        <img
            className="header-pfp"
            alt="pfp"
            src="https://www.goomlandscapes.co.nz/wp-content/uploads/2018/08/logo-placeholder.png"
        />
    )
}

export default function Header() {
    const user = useSelector(state => state.user);
    return (
        <header className="header-container">
            <div className="header-brand">
                <Logo />
                {/* <div className="header-title"> Speech Analysis </div> */}
            </div >
            <div className="header-user">
                <ProfilePicture />
                <div className="header-username"> {user.username} </div>
            </div>
        </header >
    );
}
