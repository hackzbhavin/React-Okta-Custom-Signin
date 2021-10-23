import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';


import 'bootstrap/dist/css/bootstrap.min.css';

import DashboardPage from '../pages/DashboardPage';
import Authenticated from '../pages/Utils/Authenticated';


const AppRouter = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/');
  };
  
  const SCOPES = 'openid profile offline_access ';

  const oktaAuth = new OktaAuth({
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    scopes: SCOPES.split(/\s+/),
    pkce: true
  });


   const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/login', window.location.origin));
  };



  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}  onAuthRequired={onAuthRequired}>
      
      <Route path='/' exact={true}  render={() => <Authenticated />}/>
      <SecureRoute path='/dashboard' component={DashboardPage} />
      <Route path='/login/callback' component={LoginCallback} />

    </Security>
  );
};
export default AppRouter;