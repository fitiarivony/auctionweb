import React, { Component } from 'react';
import URLHelper from '../../../../Helper/URLHelper';
import FetchHelper from '../../../../Helper/FetchHelper';
import Navclient from '../../Header/Navclient';
import Header from '../../Header/Header';
import Tab from '../../../Generalized/Tab';
import Loader from '../../../Generalized/Loader';

class HistoriqueRenchere extends Component {
    state={
      loading:true,
        historique:[],
        headers:[
            {
              label:"Nom ",
              value:"nom"
            },
             {
              label:"Prenom ",
              value:'prenom'
             },
             {
              label:"Date de l'enchere",
              value:'daterenchere'
             },
             {
              label:"Prix mise",
              value:"prix",
             },
             
          ]
    }
    constructor() {
        super();
        this.init();
         
    }
    async init(){
    
    //    if (localStorage.getItem("idutilisateur")!==undefined &&  localStorage.getItem("idutilisateur")!==null && new URLSearchParams(window.location.search).get("authorization")!==undefined) {
    //     let header={
    //       authorization:(new URLSearchParams(window.location.search).get("authorization"))
    //     }  
        let data = await FetchHelper.getData(URLHelper.urlgen("renchere_utilisateur/historique/"+(new URLSearchParams(window.location.search)).get("idenchere")));
         console.log(data);
         if(data.status !==undefined){
          alert("Code "+data.status+":"+data.message);
          window.location.href="/connexion";
         }else{
            this.setState({historique:data.data,loading:false});
           
         }
       }
    //    else{
    //       window.location.href="/connexion";
    //    }
    // }

    render() {
        return (
            <>
            <Header  ></Header>
      
      <Navclient></Navclient>

      { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
      <div className="container">
      
      <div id="card" className="card border-secondary mb-3"  style={{maxWidth: "300rem"}}>
      <div  id="card-header" className="card-header text-center"><h2>Liste des encheres</h2> </div>
      <div  id="card-body" className="card-body text-dark">
        <div id="content" className="container">


      <Tab headers={this.state.headers} data={this.state.historique} valuekey='idenchere'></Tab>       
       <br/>
       
         </div>
      </div>
      </div>
      </div>
        )};
            
            </> 
        );
    }

}
export default HistoriqueRenchere;