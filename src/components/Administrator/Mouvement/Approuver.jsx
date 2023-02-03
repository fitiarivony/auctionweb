import React, { Component } from 'react'
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Loader from '../../Generalized/Loader';
class Approuver extends Component {
    state={
        loading:true,
    }
    constructor(){
        super();
            this.update();
        }
        async update(){
            let json={
                valide:1
              };
              let header={
                authorization:(new URLSearchParams(window.location.search).get("authorization")),
                "Content-type": "application/json; charset=UTF-8",
              }  
              let data = await FetchHelper.put(URLHelper.urlgen("mouvement/"+
                new URLSearchParams(window.location.search).get('idmouvement')
                ), json,header);
                let link="";
                if ((new URLSearchParams(window.location.search).get('authorization'))!==null) {
                    link="?authorization=" + new URLSearchParams(window.location.search).get('authorization');
                }
                if (data.status === undefined || data.status === null) {
             
                    window.location.href = '/homeadmin'+link; 
                } else {
                    alert("Error " + data.status + ":" + data.message);
                    window.location.href = '/homeadmin'+link; 
                }
        }
        render(){
            return(
                <>
  { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
        <></>
        )}


                </>
            );
        }
}
export default Approuver;