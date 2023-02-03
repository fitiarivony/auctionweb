
import React, { Component } from 'react';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Loader from '../../Generalized/Loader';
import Tab from '../../Generalized/Tab';
import Header from '../Header/Header';
import NavAdmin from '../Header/NavAdmin';
            class EnchereEnCours extends Component{
                state={
                    loading:true,
                    encheres:[],
                    headers:[{
                        label:"Nom produit",
                        value:"nomproduit",
                    },{
                        label:"Date enchere",
                        value:"dateenchere",
                    },
                      {  label:"Duree enchere",
                        value:"dureeenchere"}
                        ,
                       { label:"Prix enchere",
                        value:"prixenchere"
                    }]
                }
        
                constructor() {
                    super();
                    this.initialize();
                }
                initialize = async() =>{
                    let data = await FetchHelper.getData(URLHelper.urlgen("enchere/encours"));
                    this.setState({encheres: data.data,loading:false})
                }
                render(){
                    return(
                        <div>
                            <Header></Header>
                            <NavAdmin/>
                            
                            <br />
                            { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
                            <div className="container bg-light">
                                <div id="card" classname="card border-secondary mb-3" style={{ maxWidth: "300rem" }}>
                                    <div id="card-header" className="card-header text-center"><h2>Liste des encheres en cours</h2> </div>
                                    <div id="card-body" className="card-body text-dark">
                                        <div id="content" className="container">
                                            <Tab headers={this.state.headers} data={this.state.encheres} valuekey='idenchere' infoperso={false}  ></Tab>
                                        </div>
                                    </div>
                                </div>
                            </div>
        )}
                        </div>
                    );
                }
            }
        export default EnchereEnCours;


