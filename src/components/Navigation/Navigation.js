import React from 'react';

const Navigation = () => {
    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }
    
    return (
        <nav style={styles.nav}>
            <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    )
}

export default Navigation;