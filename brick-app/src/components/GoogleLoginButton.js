import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box } from '@mui/material';
import jwtDecode from 'jwt-decode';

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
    // console.log(decoded);

    localStorage.setItem('loggedUser', decoded.name);
    console.log('SUCCESS', response);
    window.location.reload();
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
