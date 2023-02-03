import React, { Component } from 'react';
import navbar from '../../myassets/css/navbar.module.css';
import image from '../../myassets/images/accueil.jpg';
class Header extends Component {
    render() {
        return (
            <div className="p-5 text-center bg-light" style={
                {backgroundImage: `url(${image})`,backgroundPosition: "center center",
                backgroundSize: "cover"}}>
            
            </div> 
        );
    }
   
}
export default Header;