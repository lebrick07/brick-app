import React from 'react';
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { addOrGetUser, addOrGetSession } from '../ApiConnection'

const AuthProvider = ({ children }) => {
    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{ redirect_uri: window.location.origin }}>
            {children}
        </Auth0Provider>
    );
};

const LoginButton = () => {
    const { loginWithPopup } = useAuth0();

    return <button onClick={() => loginWithPopup()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>;
};

const OnSuccess = async (user) => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!user || session) {
        return;
    }

    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await addOrGetUser({
        name: user.name,
        email: user.email,
        isEmailVerified: user.email_verified
    }).then(async (userId) => {
        const currSession = { id: sessionId, userName: user.name };

        await addOrGetSession({
            id: currSession.id,
            data: JSON.stringify({ user_id: userId })
        }).then(() => {
            localStorage.setItem('session', JSON.stringify(currSession));
        }).catch((error) => {
            console.error(error);
        });
    }).catch((error) => {
        console.error(error);
    });

    window.location.reload();
}

export { AuthProvider, LoginButton, LogoutButton, OnSuccess };