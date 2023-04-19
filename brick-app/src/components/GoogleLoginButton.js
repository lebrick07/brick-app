import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { addOrGetUser, addOrGetSession } from '../ApiConnection'

function GoogleLoginButton() {
  const [session, setSession] = useState({ id: '', userName: '' });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.id !== '') {
      setSession(session);
    }
  }, []);

  const onSuccess = async response => {
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let decoded = jwtDecode(response.credential);

    await addOrGetUser({
      name: decoded.name,
      email: decoded.email,
      isEmailVerified: decoded.email_verified
    }).then(async (userId) => {
      console.log(`User with ID: ${userId} added/retrieved successfully`);
      const currSession = { id: sessionId, userName: decoded.name };

      await addOrGetSession({
        sessionId: currSession.id,
        expires: new Date().getTime(),
        data: JSON.stringify({ user_id: userId })
      }).then(() => {
        setSession(currSession);
        localStorage.setItem('session', JSON.stringify(currSession));
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });

    console.log('SUCCESS', response);
    window.location.reload();
  }

  const onFailure = response => {
    console.log('FAILED', response);
  };

  const handleLogout = () => {
    localStorage.removeItem('session');
    console.log('SUCCESS LOG OUT');
    window.location.reload();
  };

  return (
    <div>
      {session.id ? (
        <Box
          onClick={handleLogout}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          SIGN OUT
        </Box>
      ) : (
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
          <div>
            {
              < GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                render={(renderProps) => (
                  <Box
                    onClick={renderProps.onClick}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    SIGN IN
                  </Box>
                )}
              />
            }
          </div>
        </GoogleOAuthProvider>
      )}
    </div>
  );
}


export default GoogleLoginButton;

export function isGoogleLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && session.id !== '') {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
}
