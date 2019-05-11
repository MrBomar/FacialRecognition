import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain-icon.png';
import './Logo.css'

const Logo = () =>{
    const styles = {
        img:{
            padding: '30px'
        }
    }

    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 188, width: 188 }} >
                <div className="Tilt-inner">
                    <img src={brain} style={styles.img} alt='brain logo' />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;