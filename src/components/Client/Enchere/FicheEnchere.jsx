import React, { Component } from 'react';
import Navclient from '../Header/Navclient';
import Header from '../Header/Header';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import {FadeLoader} from 'react-spinners'
import Loader from '../../Generalized/Loader';

class FicheEnchere extends Component {
    state={
        loading:true,
        enchere:{
            idenchere:"",
            dateenchere:"",
            descri:"",
            idProduit:"",
            idutilisateur:"",
            detail_catprods:[
                {
                    idcategorie:"",
                    nomcategorie:"",
                    nomproduit:"",
                }
            ],
            dureeenchere:0,
            etat:0,
            prixenchere:0,
            sary:[
                {
                    idsary:"",
                    basesary:""
                }
            ]

        }
    }
  
    

    constructor() {
       super();
        this.initialize();
    }
     initialize=async() =>{
        let idenchere=new URLSearchParams(window.location.search).get('idenchere');
        let data=await FetchHelper.getData(URLHelper.urlgen("enchere/fiche/"+idenchere));
        this.setState({enchere:data.data,loading:false});
       
    }
     Base64ToImage(base64img, callback){
        let img = new Image();
        img.onload = function () {
            callback(img);
        };
        img.src = base64img;
        img.width=285;
        img.height=200;
    }
    format(date){
        
        if( new Date(date).toString() !== "Invalid Date" &&  typeof(date)==="string"){
           let daty =new Date(date);
           return daty.toLocaleString();
           
        }
        return date;
    }
    displaypics(){
        this.state.enchere.sary.forEach(element => {
            this.Base64ToImage(element.basesary, function (img) {
              let docmain=document.getElementById('main');
              docmain.appendChild(img);
          })});
    }

    rencherir(idenchere){
        
        let link=""
        if((new URLSearchParams(window.location.search).get('authorization'))!==null){
            link="&&authorization="+(new URLSearchParams(window.location.search).get('authorization'));
            console.log(this.state.enchere);
            window.location.href='/rencherir?idenchere='+idenchere+link;
        }else{
            window.location.href="/connexion";
        }
         
    }
    showRencherir(){
        if(this.state.enchere.etat===0 && this.state.enchere.idutilisateur!==localStorage.getItem('idutilisateur')){
                return <> <br/><button className='btn btn-success' onClick={()=>{this.rencherir(this.state.enchere.idenchere) }}>Rencherir</button></>
        }
    }
   

    render() {
        return (
             <>
             <Header  ></Header>
            <Navclient></Navclient>
       <br/>
       { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
       <div class="row">
        <div class="col"></div>
        <div class="col">

       <div id="details" className="container">
            <div className="card" style={{width: "18rem"}}>
             <div id="main" className="card-img-top">
            {this.displaypics()}

             </div>
             <div className="card-body">
               <h1 className="card-title" id="nomproduit">{this.state.enchere.detail_catprods[0].nomproduit}</h1>
               <p id="descri"></p>
              <ul className="list-group">
               <li className="list-group-item " aria-current="true">Date de mise enchere:{this.format(this.state.enchere.dateenchere)} </li>
               <li className="list-group-item">Prix: <b  id="prixenchere"></b>{this.state.enchere.prixenchere} AR</li>
               <li className="list-group-item">Duree de l'enchere: {this.state.enchere.dureeenchere} mn</li>
               <li className="list-group-item">Categorie(s):
               <ul className="list-group">
                {
                    this.state.enchere.detail_catprods.map((categorie)=>{
                        return  <li className="list-group-item" key={categorie.idcategorie}>{categorie.nomcategorie}</li>;
                    })
                }
                
               </ul>
               {this.showRencherir()}
               </li>





              </ul>
             </div>
             </div>
            </div>

            </div>
        <div class="col"></div>
      </div>
        )}
             </>
        );
    }
}
export default FicheEnchere;