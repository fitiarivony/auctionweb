import React, { Component } from 'react';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Loader from '../../Generalized/Loader';
import Tab from '../../Generalized/Tab';
import Header from '../Header/Header';
import NavAdmin from '../Header/NavAdmin';
    class Listecategorie extends Component {
        state = {
            loading:true,
            categories: [],
            headers: [{
                label: "Nom categorie",
                value: "nomcategorie"
            }
            ], 
             link:{
                label:"Mettre a jour categorie",
                value:"/categorie/update"
              }
        }
        constructor() {
            super();
            this.initialize();
        }
        initialize = async () => {
            let data = await FetchHelper.getData(URLHelper.urlgen("categorie"));
            this.setState({ categories: data.data,loading:false });
        }
        render() {
            return (
                <div>
                    <Header></Header>
                    <NavAdmin/>
                    <br />
                    { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
                    <div className="container">
                        <div id="card" className="card border-secondary mb-3" style={{ maxWidth: "300rem" }}>
                            <div id="card-header" className="card-header text-center"><h2>Liste des encheres</h2> </div>
                            <div id="card-body" className="card-body text-dark">
                                <div id="content" className="container">
                                    <Tab headers={this.state.headers} data={this.state.categories} valuekey='idcategorie' infoperso={true} link={this.state.link} ></Tab>
                                </div>
                            </div>
                        </div>
                    </div>
        )}
                </div>

            );
        }
    }
export default Listecategorie;