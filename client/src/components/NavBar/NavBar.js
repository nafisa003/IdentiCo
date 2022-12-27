import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,  Container,  Icon,  Menu, Segment } from 'semantic-ui-react';
import { UserContext } from '../../App';
import { handleSignOut } from '../Login/firebaseTask';
import './NavBar.css';
const NavBar = () => {
    const [user,setUser]=useContext(UserContext);
    const [activeItem,setActiveItem]=useState('identico');
    const signOut=()=>{
        handleSignOut()
        .then(res=>setUser(res) );
    }
    

    
    return (
       
        <Menu style={{marginTop:10}} inverted icon >
            <Link to="/" className=" link item" 
           >
        <img src="/images/logo.png" style={{height:30,marginRight:5}}></img> 
        <span>IdentiCo</span>
            </Link>

            <Menu.Menu position="right">
                <Link to="/companies" className="link item"
               
               >
                Companies
                </Link>
                <Link to="/companies/new" className="link item"
               >
               <Icon name="add"></Icon> Add Company
                </Link>
               

                <Menu.Item>
                    <Button onClick={signOut}
                     color="grey">Sign Out</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
       
      
    );
};

export default NavBar;