import React, { Component } from 'react';
import Navclient from '../../Header/Navclient';
import Header from '../../Header/Header';
import FetchHelper from '../../../../Helper/FetchHelper';
import URLHelper from '../../../../Helper/URLHelper';
import Resultat from './Resultat';
import Loader from '../../../Generalized/Loader';

class Recherche extends Component{
    state={
        loadingresponse:false,
        loading:true,
        recherche:{
            motcle:"",
            categorie:[],
            debut:null,
            fin:null,
            etat:0,
            prixmax:null,
            prixmin:null,
        },
        categories:[],
        resultat:[],
    }

    constructor() {
        super();
        this.initialize();
    }
    initialize=async ()=>{
        let data=await FetchHelper.getData(URLHelper.urlgen("categorie"));
        this.setState({categories:data.data,loading:false});
    }

    
    change=(e)=>{
        let recherche=this.state.recherche;
        if(e.target.value==="")recherche[e.target.name]=null;
        else{
          recherche[e.target.name]=e.target.value;
        } 
        this.setState({recherche:recherche});
    }
    handlechangenumber=(e)=>{
        let recherche=this.state.recherche;
        if (e.target.value==="")recherche[e.target.name]=null;
        else recherche[e.target.name]=Number.parseFloat(e.target.value);
        this.setState({recherche:recherche});
    }

    handleCategorie=(e)=>{
        let recherche=this.state.recherche;
        if(e.target.checked){
            
            recherche.categorie.push(e.target.value);
            this.setState({recherche:recherche});
        }else{
            if (recherche.categorie.length===1) recherche.categorie.pop();
           const index=recherche.categorie.indexOf(e.target.value);
           recherche.categorie.splice(index,1);
           this.setState({recherche:recherche});
        }
        
    }
    handleSumbit=(event)=>{
        event.preventDefault();
        console.log(this.state.recherche);
        this.setState({loadingresponse:true});
        this.getresult();
    }
    getresult=async()=>{
        let data=await FetchHelper.getDataPost(URLHelper.urlgen("enchere/recherche"),this.state.recherche,
        {"Content-Type": "application/json"}
        );
       this.setState({resultat:data.data,loadingresponse:false});
       window.scrollTo(0, 0);
    }
    
    render() {
        return (
             <>
              <Header  ></Header>
                <Navclient></Navclient>

                <br />
            <br />  
        <div className="row">
            <div className="col">
            <form   onSubmit={this.handleSumbit}>
            <div id="card" className="card   border-info mb-3" style={{minWidth:"30rem"}}>
           
                        <div id="card-header" className="card-header text-center"><h2> Recheche avancée</h2></div>
                        <div className="card-body ">
                            <h5 className="card-title">Faites la recherche avancée d'une enchere</h5>
                          <hr/>
                          <div className="mb-3">
                            <label for="motcle" className="form-label">Mot clé</label>
                            <input type="text " onInput={this.change} name="motcle" className="form-control" id="motcle" aria-describedby="Mot clé"/>
                            
                          </div>

                          <div className="mb-3">
                            <label for="date" className="form-label">Entre les dates</label>
                            <input type="datetime-local" name="debut" onInput={this.change} onClick={this.change} className="form-control" id="date" aria-describedby="Date"/>
                            <br/>
                            <input type="datetime-local"  name="fin" onInput={this.change} onClick={this.change} className="form-control" id="date" aria-describedby="Date"/>
                          </div>

                          <div className="mb-3">
                          { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
                           <table className="table table-condensed table-hover">
                            <thead>
                                <tr>
                                    <th>Categorie</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categories.map(category => 
                                    <tr key={category.idcategorie}>
                                    <td>{category.nomcategorie}</td>
                                        <td> <input type="checkbox" onChange={this.handleCategorie} name="categorie"  value={category.idcategorie} /> </td>
                                    </tr>
                                    )}
                            </tbody>
                           </table>
        )}
                            
                          </div>

                          <div className="mb-3">
                            <label for="prix1" className="form-label">Entre les prix</label>
                            <input type="number" onInput={this.handlechangenumber} name="prixmin" className="form-control" id="date" aria-describedby="prix"/>
                            <br/>
                            <input type="number"  onInput={this.handlechangenumber} name="prixmax"  className="form-control" id="date" aria-describedby="prix"/>
                          </div>

                          <div className="mb-3">
                          
                               Done: <input type="radio" onChange={this.handlechangenumber} name="etat" value="1" />
                               En cours: <input type="radio" onChange={this.handlechangenumber} name="etat"  value="0" checked />
                          </div>
                          <div className="mb-3">
                          
                                <input type="submit" className="btn btn-success" value="Rechercher"/>
                              
                          </div>

                        </div>
                    </div>
                    </form>




            </div>
            <div className="col">
            <div id="card" className="card   border-info mb-3" style={{minWidth:"40rem"}}>
               <Resultat result={this.state.resultat} loading={this.state.loadingresponse}></Resultat>
            </div>

                 
            </div>
            <div className="col"></div>
        </div>
        
             
             </>
        );
    }
}
export default Recherche;