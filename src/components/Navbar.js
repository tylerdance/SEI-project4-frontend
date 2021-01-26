import React from 'react';
import { NavLink, Redirect, Route} from 'react-router-dom';

const Navbar = (props) => {
    console.log(props.user)
    function revealProfile(){
        if(!document.querySelector('#profile')){
            let notification
                if (props.user) {notification = `/chat/${props.user.id}`}
                    window.location.href=notification 
       }
     
        document.querySelector('#profile').style.display="block";
        document.querySelector('#home').style.display="none";
    }

  
    function revealHome(){
        if(!document.querySelector('#profile')){
            let notification
                if (props.user) {notification = `/chat/${props.user.id}`}
                    window.location.href=notification 
        }
        document.querySelector('#home').style.display="block";
        document.querySelector('#profile').style.display="none";
    }

    return (
        <nav className="nav">
         
                {/* <Link className="navbar-brand" to="/">Reveal</Link> */}
                
               
                    {
                        props.isAuth 
                         
                        ? <div>
                            <div className="userNav">
                         <div >
                            <img alt={props.user.name} src={props.user.image_url} class="iconPic2"/>
                         </div>
                         <div className="namaewa">
                            {props.user.name}
                         </div>
                         <div className="namaewa"> 
                            <button  className="namaewa navbutton" onClick={revealHome}>Home</button>
                            </div>
                            <div className="namaewa">
                                <button  className="namaewa navbutton" onClick={revealProfile}>Profile</button>
                            </div>
                            
                            <div className="namaewa">
                                <span onClick={props.handleLogout} className="nav-link logout-link">Logout</span>
                            </div>
                         
                            </div>
                             
                           
                           
    
                        
                        </div>
                        : <div className="userNav2">
                            <div className="namaewa one">
                        
                                <NavLink  to="/signup">Create Account</NavLink>
                             </div>
                           
                            <div className="namaewa two">
                                <NavLink className="nav-link"  to="/login">Login</NavLink>
                            </div>
                            </div>
                        
                    }
               
          
        </nav>
    );
}
export default Navbar;