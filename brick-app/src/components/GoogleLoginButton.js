import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Box } from '@mui/material';
import { gapi } from 'gapi-script';

function GoogleLoginButton() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = response => {
    console.log('SUCCESS', response);
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
  };

  return (
    <div>
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
      <GoogleLogout
        clientId={process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID}
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
    </div>
  );
}

export default GoogleLoginButton
