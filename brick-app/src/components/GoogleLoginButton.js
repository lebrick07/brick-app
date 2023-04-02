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
        scope: 'email',
      })
        .then(() => {
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          setIsLoggedIn(isSignedIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = response => {
    console.log('SUCCESS', response);
    setIsLoggedIn(true);
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };

  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
    setIsLoggedIn(false);
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
