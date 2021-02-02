# React Firebase Chat Demo

## Set Firebase Project Configuration

Set your app's Firebase project configuration as environment variables.\
Create a `.env` file in the project directory and insert your key/value pairs in the following format of `KEY=VALUE`.

```
REACT_APP_FIREBASE_API_KEY=YOUR-UNIQUE-CREDENTIALS
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR-PROJECT-NAME.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://YOUR-PROJECT-NAME.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR-PROJECT-FIREBASE-PROJECT-ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR-PROJECT-NAME.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR-PROJECT-SENDER-ID
REACT_APP_FIREBASE_APP_ID=YOUR-PROJECT-APP-ID
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR-PROJECT-MEASUREMENT-ID
```

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install all dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
