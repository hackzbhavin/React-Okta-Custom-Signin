import React from 'react'
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

export default function NavigationMenu({title}) {

  const { authState, oktaAuth } = useOktaAuth();

  const authStatus = authState.isAuthenticated


  const handleLogout = async() =>{
    oktaAuth.tokenManager.clear()
    oktaAuth.signOut()
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
          <Link className="navbar-brand font-monospace " to='/'>
            {title}
          </Link>
         
    <div className="collapse justify-content-end  navbar-collapse" id="navbarTogglerDemo02">
 
 {authStatus && (
   <ul className="navbar-nav ">
      <li className="nav-item ">
        <button className="btn btn-danger block" onClick={handleLogout}>Logout</button>
      </li>
    </ul>)
  }
  </div>


        </nav>
    )
}
