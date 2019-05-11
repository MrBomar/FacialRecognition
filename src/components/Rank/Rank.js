import React from 'react';

const Rank = () => {
    const styles = {
        div:{
            color: 'white'
        }
    }

    return (
        <div style={styles.div}>
            {'Leslie, your current rank is...'}
            <h1>#5</h1>
        </div>
    )
}

export default Rank;