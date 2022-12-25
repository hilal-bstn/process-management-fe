import React from "react";
import imageSrc from '../../images/demo.jpg';

const Footer=()=>{
    return(
        <div className="footer">
             <img 
            alt="logo"
            className='logo'
            src={imageSrc}
            ></img>
        </div>
    )
};

export default Footer;