import React, { Component } from 'react';
import choicecss from './myassets/css/Choice.module.css';
class Choice extends Component{
    render() {
        
        return(
            
<div className={choicecss.choix}>
            <h1 className={choicecss.h1} >Veuillez choisir</h1>
            <div className={choicecss.util}  >
                <form action="">

                     <button onClick={()=>{window.location.href="/homeclient"}} className={choicecss.btn_util}   type="button"> UTILISATEUR</button>
                </form>
               
            </div>
            <div className={choicecss.admin} >
                <button  onClick={()=>{window.location.href="/connect"}} className={choicecss.btn_admin}   type="button"> ADMINISTRATEUR </button>
            </div>        
        
        </div>
        );

    }
}
export default Choice;       