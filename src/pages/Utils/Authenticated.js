import React from 'react'
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import LoginPage from '../LoginPage';


export default function Authenticated() {
    
    const { authState } = useOktaAuth();

    if (!authState) {
      return <div>Sorry Loading...


          
      </div>;
      
    }
    return authState.isAuthenticated ?
      <Redirect to={{ pathname: '/dashboard' }}/> :
      <LoginPage />;


}
