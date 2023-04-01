import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Box } from '@mui/material';

const GoogleLoginButton = ({ onGoogleLoginSuccess, onGoogleLoginFailure }) => {
  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    onGoogleLoginSuccess(response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log(error);
    onGoogleLoginFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <Box
          onClick={renderProps.onClick}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            padding: '6px 16px',
            border: '1px solid',
            borderRadius: '4px',
          }}
        >
          Sign in with Google
        </Box>
      )}
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={false}
    />
  );
};

// Add defaultProps to provide default empty functions
GoogleLoginButton.defaultProps = {
  onGoogleLoginSuccess: () => {},
  onGoogleLoginFailure: () => {},
};

export default GoogleLoginButton;
