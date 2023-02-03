import React, { Component } from 'react';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Header from '../Header/Header';
import NavAdmin from '../Header/NavAdmin';
    class Comission extends Component {
        state = {
            comission: {
                valeurcomission: ""
            }
        }

        change = e => {
            let comission = this.state.comission;
            comission[e.target.name] = e.target.value;
            this.setState(comission);
        }

        handleSumbit = (event) => {
            event.preventDefault();
            this.submit();
        }

        async submit() {
          let header={
            authorization:(new URLSearchParams(window.location.search).get("authorization")),
            "Content-type": "application/json; charset=UTF-8",
          }  
          let link="";
          if ((new URLSearchParams(window.location.search).get('authorization'))!==null) {
              link="?authorization=" + new URLSearchParams(window.location.search).get('authorization');
          }
            let data = await FetchHelper.getDataPost(URLHelper.urlgen("comission"), this.state.comission,header);
            if (data.status === undefined || data.status === null) {
                //localStorage.setItem("idutilisateur", data.data.idutilisateur);
               alert("Success!")
               
            } else {
                alert("Error " + data.status + ":" + data.message);
            }
            window.location.href = '/homeadmin'+link; 
        }
        render(){
          return(
            <>
            <Header></Header>
            <NavAdmin></NavAdmin>
               <div className="row">
          <div className="col"></div>
          <div className="col">
            <div id="details">
              <div className="card" style={{ width: "18rem" }}>
                <form id="myForm" onSubmit={this.handleSumbit}>
                  <div id="card-header" className="card-header text-center" ><h4> Ajouter une nouvelle comission!!</h4></div>
                  <div id="main" className="card-img-top"></div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Valeur comission</label>
                      <input type="text" name="valeurcomission" value={this.state.comission.valeurcomission} onInput={this.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>

                    <div className="mb-3">
                      <input type="submit"  className="btn btn-success" value="Ajouter" />

                    </div>
                </div>
                </form>
              </div>


            </div>



          </div>
          <div className="col"></div>
        </div>
            
            </>
          );
         

        }
    }
    export default Comission;