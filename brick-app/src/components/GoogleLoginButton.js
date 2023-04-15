import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { addOrGetUser } from '../ApiConnection'

function GoogleLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedStorage = localStorage.getItem('isLoggedIn');
    if (isLoggedStorage && isLoggedStorage !== 'false') {
      setIsLoggedIn(true);
    }
  }, []);

  const onSuccess = response => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');

    let decoded = jwtDecode(response.credential);
    localStorage.setItem('loggedUser', decoded.name);

    addOrGetUser({
      name: decoded.name,
      email: decoded.email,
      isEmailVerified: decoded.email_verified,
      clientId: response.clientId,
    }, () => { console.log('User added/retrieved successfully!'); });

    console.log('SUCCESS', response);
  };

  const onFailure = response => {
    console.log('FAILED', response);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('loggedUser');
    console.log('SUCCESS LOG OUT');
    window.location.reload();
  };

  return (
    <div>
      {isLoggedIn ? (
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

export function useGoogleLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedStorage = localStorage.getItem('isLoggedIn');
    if (isLoggedStorage && isLoggedStorage !== 'false') {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
}
