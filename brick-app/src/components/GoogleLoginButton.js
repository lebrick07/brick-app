import React from 'react';
import { GoogleLogin } from 'react-google-login';

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
      buttonText="Sign in with Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '1rem' }}
      isSignedIn={false}
    />
  );
};

export default GoogleLoginButton;
