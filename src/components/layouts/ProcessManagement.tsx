import React from "react";
import imageSrc from '../../images/demo.jpg';
const ProcessManagement=()=>{
    return(
        <div >
             <img  
                src={imageSrc}
                alt="logo"
                className='process-image'>
            </img>

            <br/>

            <div>
                <h1 className='process-title'>
                    Process Management Panel             
                </h1>    
            </div>   
        </div>
    )
};

export default ProcessManagement;