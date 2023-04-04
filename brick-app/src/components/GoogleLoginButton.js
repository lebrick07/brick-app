import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Box } from '@mui/material';
import { gapi } from 'gapi-script';

function GoogleLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        ux_mode: 'redirect',
      });
      const isLoggedStorage = localStorage.getItem('isLoggedIn');
      if (isLoggedStorage && isLoggedStorage !== 'false') {
        setIsLoggedIn(true);
      }
    }
  
    gapi.load('client:auth2', start);
  }, []);
    

  const onSuccess = response => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedUser', response.profileObj.name);
    console.log('SUCCESS', response);
    window.location.reload();
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('loggedUser');
    console.log('SUCCESS LOG OUT');
    window.location.reload();
  };

  return (
    <div>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          onLogoutSuccess={onLogoutSuccess}
          render={(renderProps) => (
            <Box
              onClick={renderProps.onClick}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
              }}
            >
              SIGN OUT
            </Box>
          )}
        />
      ) : (
        <GoogleLogin
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
                fontSize: '0.9rem',
              }}
            >
              SIGN IN
            </Box>
          )}
        />
      )}
    </div>
  );
}

export default GoogleLoginButton;
