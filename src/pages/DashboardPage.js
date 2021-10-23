import React from 'react'
import Layout from '../Components/Layout'
import { useOktaAuth } from '@okta/okta-react';

export default function DashboardPage() {
    const { authState } = useOktaAuth();
    console.log(authState);

    const userData = authState.idToken.claims.name
    const accessToken = authState.accessToken.accessToken
    const refreshToken = authState.refreshToken.refreshToken
    return (
<Layout>

<div className="jumbotron  mt-5 jumbotron-fluid">
    <div className="container">
        <h1 className="display-3">Welcome {userData}</h1>
        <h4 className="lead">Your Are on Private Route</h4>

        <p className="lead ">{accessToken}</p>
        <p className="lead">Your Refresh Token is {refreshToken}</p>
  
    </div>
</div>




</Layout>

    )
}
