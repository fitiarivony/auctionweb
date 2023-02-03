import React, { Component } from 'react';
import navbar from '../../myassets/css/navbar.module.css';
import 'bootstrap/dist/js/bootstrap.bundle'; 
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';

class NavAdmin extends Component {
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
  let data =await FetchHelper.getData(URLHelper.urlgen("admin/preparelogout"), header);
  if(data.status !==undefined){
    alert("Code "+data.status+":"+data.message);
    window.location.href="/homeadmin";
   }else{
    alert("Vous allez vous deconnectez!! Au revoir");
    let data1=await FetchHelper.getData(URLHelper.urlgen("admin/logout/"+data.data.idadministrateur));
  
    if (data1.status!==undefined) {
    
      alert("Code "+data1.status+":"+data1.message);
      localStorage.removeItem('idaministreur');
      window.location.href="/homeadmin";
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
                  <a id={navbar.navlink} className="nav-link" href={"/homeadmin"+this.state.option}>Accueil</a>
                  <a  id={navbar.navlink} className="nav-link active" href={"/utilisateur"+this.state.option}>Liste des utilisateurs</a>
                  <a  id={navbar.navlink} className="nav-link" href={"/enchere/encours"+this.state.option}>Encheres en cours</a>
                  <a id={navbar.navlink} className="nav-link " href={"/mouvement"+this.state.option}>Approuver mouvement</a>
                  <a id={navbar.navlink} className="nav-link " href={"/statistique"+this.state.option}>Statistique</a>
                  <a id={navbar.navlink} className="nav-link " href={"/comission"+this.state.option}>Comission</a>
                  <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorie
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href={"/categories"+this.state.option}>Liste des categories</a></li>
            <li><a class="dropdown-item"  href={"/categorie"+this.state.option}>Créer une categorie</a></li>
          </ul>
        </li>

                  {this.checkconnex()}
                </div>
              </div>
            </div>
          </nav>
        );
    }
}
export default NavAdmin;