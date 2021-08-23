import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from 'aws-amplify';

import COGNITO_CONFIG from './config';
import App from './components/App';

Auth.configure({
  Auth: {
    mandatorySignId: true,
    region: COGNITO_CONFIG.pool_region,
    userPoolId: COGNITO_CONFIG.pool_id,
    userPoolWebClientId: COGNITO_CONFIG.client_id,
  },
});

ReactDOM.render(<App />, document.querySelector('#root'));
