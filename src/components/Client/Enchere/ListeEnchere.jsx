import React, { Component } from 'react';
import URLHelper from '../../../Helper/URLHelper';
import FetchHelper from '../../../Helper/FetchHelper';
import Navclient from '../Header/Navclient';
import Header from '../Header/Header';
import Tab from '../../Generalized/Tab';
import {FadeLoader} from 'react-spinners'
import Loader from '../../Generalized/Loader';

class ListeEnchere extends  Component{
  state={
      loading : true,
      encheres:[],
      headers:[
        {
          label:"Nom du produit",
          value:"nomproduit"
        },
         {
          label:"Date de l'enchere",
          value:'dateenchere'
         },
         {
          label:"Duree de l'enchere(mn)",
          value:'dureeenchere'
         },
         {
          label:"Etat",
          value:"etat",
          formatting:[{label:"Fini",value:1},{label:"En cours",value:0}]
         },
          {
            label:"Prix minimum ",
            value:"prixenchere",
          },
          {
            label:"Valeur de la comission",
            value:"valeurcommission"
          }
      ],
      link:{
        label:"Voir enchere",
        value:"/enchere"
      }

  }
  constructor() {
    super();
    this.initialize();
  }
   initialize=async()=> {
    let data= await FetchHelper.getData(URLHelper.urlgen("enchere/details"));
    this.setState({encheres:data.data , loading:false});
  }
  render() {
    return (
      <>
     
          <div>
<Header  ></Header>
      
     <Navclient></Navclient>
      
      <br/>
      
      
      
      <div className="container">
      
      
      <div id="card" className="card border-secondary mb-3"  style={{maxWidth: "300rem"}}>
      
        
      <div  id="card-header" className="card-header text-center"><h2>Liste des encheres</h2> </div>
      
    
      <div  id="card-body" className="card-body text-dark">
      
        <div id="content" className="container">
        { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
        <Tab headers={this.state.headers} data={this.state.encheres} valuekey='idenchere' infoperso={true} link={this.state.link} ></Tab>
        )}
        </div>
      </div>
      </div>
     
 
     </div>
      </div>
  
      </>
        
    );
  }
  

}
export default ListeEnchere;



{/* <script src="js/table.js"></script>
<script src="js/URLHelper.js"></script>
<script src="js/request.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script> */}


{/* var content = document.getElementById("content");


var ajax = function (url, method) {
const xhttp = new XMLHttpRequest();
xhttp.onload = function () {

  let tableau=new Tableau((JSON.parse(this.responseText)).data,content,"table1",[ new Colonne("nomproduit","Nom produit"),new Colonne("dateenchere","Date enchere"),new Colonne("dureeenchere","Duree enchere"),new Colonne("prixenchere","Prix enchere")])
       tableau.initialize();
       for (let i = 0; i < tableau.getdata().length; i++) {
            tableau.addcomponent(i,"button",tableau.getdata()[i].idenchere,"enchere","btn btn-outline-danger","Voir enchere");
       }
       var rows = document.getElementsByName('enchere');
       for(let i=0 ; i<rows.length ;i++){
  rows[i].addEventListener("click" , function(){
    let url="";
    if (getrequest().authorization!=undefined)
            url+="&&authorization="+getrequest().authorization;
            // console.log("Liste_Kilometrage.html?idVehicule="+rows[i].id+url);
      window.location.href = "FicheEnchere.html?idenchere="+rows[i].id+url;
  });
}
}
xhttp.open(method, url, false);
xhttp.send();
}
ajax(URLHelper.urlgen("enchere/details"),"GET"); */}


{/* </script> */}


