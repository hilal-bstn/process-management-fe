import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div>
           {auth ? 
                <ul className='nav-ul'>
                    <li><Link to="/">Reports</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/companies">Companies</Link></li>
                    <li><Link onClick={logout} to="/login">Logout ({JSON.parse(auth).name})</Link></li>
                                   
                </ul>
                :
                <ul className='nav-ul nav-rigth'>
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;