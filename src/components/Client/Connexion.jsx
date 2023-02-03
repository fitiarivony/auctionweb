import React, { Component } from 'react';
import Header from './Header/Header';
import URLHelper from '../../Helper/URLHelper';
import FetchHelper from '../../Helper/FetchHelper';
import Navclient from './Header/Navclient';

class Connexion extends Component {
    state={
        client:{
            identifiant:"jean",
            mdp:"jean"
        }
        
       
      }
      
     change=(e)=>{
        let client=this.state.client;
        client[e.target.name]=e.target.value;
        this.setState(client);
    }
    handleSumbit=(event)=>{
      event.preventDefault();
     this.login();
      
  }
  login=async ()=>{
    
    let data= await FetchHelper.getDataPost(URLHelper.urlgen("utilisateur/login"),this.state.client,
    {
      "Content-Type": "application/json",
    });
    
    if(data.status===undefined || data.status===null){
      localStorage.setItem("idutilisateur",data.data.idutilisateur);
       window.location.href='/homeclient?authorization='+data.data.token;
    }else{
      alert("Error "+data.status+":"+data.message);
    }
  }
       
    render() {
        return (
            <>
            <Header  ></Header>
            <Navclient/>
             <br/>

             <div className="row">
        <div className="col"></div>
        <div className="col">
          <div id="details">
            <div className="card" style={{width: "18rem"}}>
              <form id="myForm" onSubmit={this.handleSumbit}>
                <div id="card-header" className="card-header text-center" ><h4> Connectez-vous en tant que client!!</h4></div>
             <div id="main" className="card-img-top"></div>
             <div className="card-body">
               <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Identifiant</label>
                <input type="text"  name="identifiant" value={this.state.client.identifiant} onInput={this.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              
               </div>

               <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Mot de passe</label>
                <input type="password"  value={this.state.client.mdp}  name="mdp" onInput={this.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              
               </div>
               <div className="mb-3">
                
                <input type="submit" className="btn btn-success" value="Connexion" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              
               </div>
              
             </div>
             </form>
           </div>
         

</div>
   


        </div>
        <div className="col"></div>
      </div>
             </>
        );
    }
}
export default Connexion;