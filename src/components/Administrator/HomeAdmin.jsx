import React, { Component } from 'react';
import image from '../myassets/images/accueil.jpg';
import stylenavbar from '../myassets/css/navbar.css';
import FetchHelper from '../../Helper/FetchHelper';
import URLHelper from '../../Helper/URLHelper';


 
class HomeAdmin extends Component {
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
        localStorage.removeItem('idadministrateur');
        window.location.href="/";
    }else{
     
      window.location.href="/";
      }
    }
  }

      

  checkConnex(){
    if (new URLSearchParams(window.location.search).get("authorization")!==undefined && 
     new URLSearchParams(window.location.search).get("authorization")!==null) {
      return <button onClick={this.deconnexion} className="list-group-item list-group-item-action">Deconnexion</button>   
  }else{
    return <a href='/connexion' className="list-group-item list-group-item-action" >Connexion</a>
  }
  }
  render() {
    return (
       <>
       <div className="p-5 text-center bg-light" style={
        {backgroundImage: `url(${image})`,backgroundPosition: "center center",
        backgroundSize: "cover"}}>
    
    </div>
    
    
    <br />
    <br />
  
  
      
        <div className="row">
          <div className="col"></div>
          <div className="col">
            
              
            <div className="container">
  
             
              <div className="card" style={{width:'60rem'}}>
                  <div id="card-header" className="card-header text-center" > <h2>Bienvenue!!</h2></div>
                  <div className="card-body">
                      <div className="list-group">
                      
                          <a href={"/utilisateur"+this.state.option} className="list-group-item list-group-item-action">Liste des utilisateurs</a>
                          <a href={"/enchere/encours"+this.state.option} className="list-group-item list-group-item-action">Les encheres en cours</a>
                          <a href={"/categories"+this.state.option} className="list-group-item list-group-item-action">Liste des categories</a>
                          <a href={"/categorie"+this.state.option} className="list-group-item list-group-item-action">Inserer une categorie</a>
                          <a href={"/mouvement"+this.state.option} className="list-group-item list-group-item-action">Approuver mouvement</a>
                          <a href={"/statistique"+this.state.option} className="list-group-item list-group-item-action">Statistique</a>
                          <a href={"/comission"+this.state.option} className="list-group-item list-group-item-action">Comission</a>
                     {this.checkConnex()}
                  
                 </div>
  
  
                  </div>
              </div>
            </div>  
              
  
  </div>
     
  
  
         
          <div class="col"></div>
        </div>
        
       
       
       
       
       </>
    );
  }
}
export default HomeAdmin;
 
  
     

  