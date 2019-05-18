import React from 'react';

const Rank = (props) => {
    const styles = {
        div:{
            color: 'white'
        }
    }
    return (
        <div style={styles.div}>
            {`${props.userName}, your current rank is...`}
            <h1>#{props.userRank}</h1>
        </div>
    )
}

export default Rank;