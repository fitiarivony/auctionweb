import React, { Component } from 'react';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Tab from '../../Generalized/Tab';
import Header from '../Header/Header';
import NavAdmin from '../Header/NavAdmin';
import {FadeLoader} from 'react-spinners'
import Loader from '../../Generalized/Loader';
class ApprouverMouvement extends Component {
                state={
                    loading : true,
                    mouvements:[],
                    headers:[{
                        label:"Numero utilisateur",
                        value:"idutilisateur"}
                        ,
                        {label:"Montant",
                        value:"montant"},
                        {label:"Date",
                        value:"dateinsertion"},
                        {label:"Motif",
                        value:"motif"}
                    ], link:{
                        label:"Approuver le mouvement",
                        value:"/approuver"
                      }
                }
                constructor() {
                    super();
                    this.initialize();
                }
                initialize = async() =>{
                    let data = await FetchHelper.getData(URLHelper.urlgen("mouvement/getNonValider"));
                    this.setState({mouvements: data.data,  loading: false})
                }
                render() {
                    return(
                        <div>
                        <Header></Header>
                        <NavAdmin/>
                        <br />
                        <div className="container">
                                <div id="card" classname="card border-secondary mb-3" style={{ maxWidth: "300rem" }}>
                                    <div id="card-header" className="card-header text-center"><h2>Approuver Mouvement</h2> </div>
                                    <div id="card-body" className="card-body bg-light text-dark">
                                        <div id="content" className="container">
                                        <div id="content" className="container">
                                        { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
            <Tab headers={this.state.headers} data={this.state.mouvements} valuekey='idmouvement' infoperso={true} link={this.state.link} ></Tab>

        )}
        </div>
                                           {/* <Tab headers={this.state.headers} data={this.state.mouvements} valuekey='idmouvement' infoperso={true} link={this.state.link} ></Tab> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                           
                           
                            
                    );
                }
            }
export default ApprouverMouvement;

