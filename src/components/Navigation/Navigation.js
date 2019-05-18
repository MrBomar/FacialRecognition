import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, logOut}) => {
    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }

    if(isSignedIn) {
        return (
            <nav style={styles.nav}>
            <p 
                onClick={()=>{
                    logOut();
                    onRouteChange('signin')
                }}
                className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={styles.nav}>
                <p 
                    onClick={() => onRouteChange('signin')}
                    className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p 
                    onClick={() => onRouteChange('register')}
                    className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        )
    }
}

export default Navigation;