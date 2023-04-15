# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting up

## Run
Before being able to run this app, some environment variables have to be set first. The easiest way to set them up is to create a `.env` file under the root folder of the API project.

The `.env` file should have the following variables:

```
REACT_APP_OPENAI_API_KEY="{API_KEY}"
REACT_APP_OPENAI_ORG_NAME="{ORG_NAME}"
REACT_APP_OPENAI_TEXT_MODEL="gpt-3.5-turbo"
REACT_APP_OPENAI_IMAGE_MODEL="image-alpha-001"
REACT_APP_OPENAI_URL="https://api.openai.com/v1/chat/completions"
REACT_APP_OPENAI_IMAGE_API_URL="https://api.openai.com/v1/images/generations"
REACT_APP_OPENAI_AUDIO_API_URL="https://api.openai.com/v1/audio/translations"
REACT_APP_GOOGLE_OAUTH_CLIENT_ID="{CLIENT_ID}"
REACT_APP_API_IP_ADDRESS="{IP_ADDR}"
REACT_APP_API_PORT="{[PRT]}"
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the project's dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

