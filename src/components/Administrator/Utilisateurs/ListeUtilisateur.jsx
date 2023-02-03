
import React, { Component } from 'react';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Loader from '../../Generalized/Loader';
import Tab from '../../Generalized/Tab';
import Header from '../Header/Header';
import NavAdmin from '../Header/NavAdmin';
class ListeUtilisateur extends Component {
        state = {
            loading:true,
            utilisateurs: [],
            headers: [{
                label: "Nom Utilisateur",
                value: "nom"
            },
            {
                label: "Prenom Utilisateur",
                value: "prenom"
            }, {
                label: "Date de naissance",
                value: "datenaissance"
            }
            ]
        }

        componentDidMount(){
            this.initialize();
        }
        async initialize() {
            let data = await FetchHelper.getData(URLHelper.urlgen("utilisateur"));
            this.setState({ utilisateurs: data.data ,loading:false});
        }

        render() {
            return (
                <>
            <Header  ></Header>

            <NavAdmin/>

            <br />
            { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (


            <div className="container">

            <div id="card" className="card border-secondary mb-3" style={{ maxWidth: "300rem" }}>
                <div id="card-header" className="card-header text-center"><h2>Liste des utilisateurs</h2> </div>
                <div id="card-body" className="card-body text-dark">
                <div id="content" className="container">
                    <Tab headers={this.state.headers} data={this.state.utilisateurs} valuekey='idutilisateur' infoperso={false}  />

                </div>
                </div>
            </div>
            </div>
        )}
        
                </>
            )
        }
    }
export default ListeUtilisateur;