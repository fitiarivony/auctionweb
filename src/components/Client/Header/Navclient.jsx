import React, { Component } from 'react';
import navbar from '../../myassets/css/navbar.module.css';
import 'bootstrap/dist/js/bootstrap.bundle'; 
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';

class Navclient extends Component {
  state={
    option:"",
}
componentDidMount(){
 
  if (new URLSearchParams(window.location.search).get("authorization")!==undefined && 
     new URLSearchParams(window.location.search).get("authorization")!==null) {
              this.setState({option:"?authorization="+new URLSearchParams(window.location.search).get("authorization")});    
  }
}

deconnexion=async()=> {
  let header={
    authorization:(new URLSearchParams(window.location.search).get("authorization"))
  }  
  let data =await FetchHelper.getData(URLHelper.urlgen("utilisateur/preparelogout"), header);
  if(data.status !==undefined){
    alert("Code "+data.status+":"+data.message);
    window.location.href="/homeclient";
   }else{
    alert("Vous allez vous deconnectez!! Au revoir");
    let data1=await FetchHelper.post(URLHelper.urlgen("utilisateur/logout/"+data.data.idutilisateur));
  
    if (data1.status!==undefined) {
    
      alert("Code "+data1.status+":"+data1.message);
      localStorage.removeItem('idutilisateur');
      window.location.href="/homeclient";
  }else{
   
    window.location.href="/";
    }
  }
}


checkconnex=()=>{
  if (new URLSearchParams(window.location.search).get("authorization")!==undefined && 
     new URLSearchParams(window.location.search).get("authorization")!==null) {
      return <button onClick={this.deconnexion} className='btn btn-danger'>Deconnexion</button>   
  }else{
    return <button className='btn btn-danger' onClick={()=>{window.location.href="/connexion"}}>Connexion</button>
  }
}
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              <a className="navbar-brand" href='/'><img src="images/logo.png" alt="" style={{maxWidth:"40px"}}/> </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a id={navbar.navlink} className="nav-link" href={"/homeclient"+this.state.option}>Accueil</a>
                  <a  id={navbar.navlink} className="nav-link active" href={"/encheres"+this.state.option}>Liste enchere</a>
                  <a  id={navbar.navlink} className="nav-link" href={"/encheres/historique"+this.state.option}>Historique de mes encheres</a>
                  <a id={navbar.navlink} className="nav-link " href={"/recherche"+this.state.option}>Recherche avancée</a>

                  {this.checkconnex()}
                </div>
              </div>
            </div>
          </nav>
        );
    }
}
export default Navclient;