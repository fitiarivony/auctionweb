import React, { Component } from 'react';
import Navclient from '../Header/Navclient';
import Header from '../Header/Header';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import ButtonSpinner from '../../Generalized/ButtonSpinner';

class Renchere extends Component {
    state={
        loading:false,
        detail_renchere:{
            prix:0,
        },
        renchere:{
            prix:0,
            idutilisateur:localStorage.getItem('idutilisateur'),
            idenchere:(new URLSearchParams(window.location.search).get('idenchere')),
            daterenchere:(new Date()).toISOString()
        }
    }
    change=(e)=>{
        let renchere=this.state.renchere;
        renchere[e.target.name]=e.target.value;
        this.setState(renchere);
    }

    handleSumbit=(event)=>{
        event.preventDefault();
        console.log(this.state.renchere);
        this.setState({loading:true});
        this.rencherir();
    }
    getlink(){
        let link=""
        if((new URLSearchParams(window.location.search).get('authorization'))!==null){
            link="?authorization="+(new URLSearchParams(window.location.search).get('authorization'));
        }
        return link;
    }
    rencherir=async ()=>{
      
      let data= await FetchHelper.getDataPost(URLHelper.urlgen("renchere_utilisateur"),this.state.renchere,
      {
        "Content-Type": "application/json",
        authorization:(new URLSearchParams(window.location.search).get('authorization'))
      });
      
      if(data.status===undefined || data.status===null){
        this.setState({loading:false});
         window.location.href='/homeclient'+this.getlink();
      }else{
        alert("Error "+data.status+":"+data.message);
        window.location.href='/homeclient'+this.getlink(); 
      }
    }
  
    

    constructor() {
       super();
        this.initialize();
    }
     initialize=async() =>{
        let idenchere=new URLSearchParams(window.location.search).get('idenchere');
        let data=await FetchHelper.getData(URLHelper.urlgen("renchere_utilisateur/gagnant/"+idenchere));
        if(data.data.length>0)this.setState({detail_renchere:data.data});
    }
     
    format(date){
        
        if( new Date(date).toString() !== "Invalid Date" &&  typeof(date)==="string"){
           let daty =new Date(date);
           return daty.toLocaleString();
           
        }
        return date;
    }
    formatResult(){
        if(this.state.detail_renchere.prix===0)return (<>Pas encore de renchere</>);
        else return this.state.detail_renchere.prix;
     }
 
    

    render() {
        return (
             <>
             <Header  ></Header>
            <Navclient></Navclient>
       <br/>
       <div class="row">
        <div class="col"></div>
        <div class="col">

       <div id="details" className="container">
            <div className="card" style={{width: "18rem"}}>
             <div id="main" className="card-img-top">
          

             </div>
             <div className="card-body">
               <h3 className="card-title" id="nomproduit">Pour l'enchere numero { new URLSearchParams(window.location.search).get('idenchere')}</h3>
               <p id="descri"></p>
              <ul className="list-group">
              <form id="myForm" onSubmit={this.handleSumbit}>
               <li className="list-group-item " aria-current="true">Prix de mise enchere maximum:{this.formatResult} </li>
               <li className="list-group-item " aria-current="true"> 
               
               <label for="prix" className="form-label">Prix:</label> <input type="number" name="prix" onChange={this.change} className='form-control' />
               
               </li>
                <li className="list-group-item " aria-current="true">  <ButtonSpinner loading={this.state.loading} titre="Rencherir"/> </li>
                </form>
              </ul>
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
export default Renchere;