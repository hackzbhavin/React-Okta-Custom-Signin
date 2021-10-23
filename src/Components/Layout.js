import React from 'react'
import NavigationMenu from './Reusable/NavigationMenu'

export default function Layout({children}) {
    return (
        <div>
            <NavigationMenu title="OKTA LOGIN"/>
            
            
            {children}

        </div>
    )
}
