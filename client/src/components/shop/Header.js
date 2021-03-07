import React from 'react'
import {Link} from 'react-router-dom';
const Header=()=>{
    return(
        <nav>
        <div class="nav-wrapper">
      <Link tp="#" class="brand-logo">IT Courses</Link>
     
           <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><Link to={'/shop'}>Shop</Link></li>
               <li><Link to={'/about'}>About</Link></li>
               </ul> 
               </div>
        </nav>
    )
}
export default Header;