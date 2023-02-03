import React, { Component } from 'react';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Header from '../Header/Header';
import NavAdmin from '../Header/NavAdmin';
import {ClipLoader} from 'react-spinners';
import ButtonSpinner from '../../Generalized/ButtonSpinner';
    class InsertCategorie extends Component {
        state = {
            loading:false,
            categorie: {
                nomcategorie: ""
            }
        }

        change = e => {
            let categorie = this.state.categorie;
            categorie[e.target.name] = e.target.value;
            this.setState(categorie);
        }

        handleSumbit = (event) => {
            event.preventDefault();
            this.setState({loading:true})
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
            let data = await FetchHelper.getDataPost(URLHelper.urlgen("categorie"), this.state.categorie,header);
            if (data.status === undefined || data.status === null) {
                //localStorage.setItem("idutilisateur", data.data.idutilisateur);
                this.setState({loading:false});
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
                  <div id="card-header" className="card-header text-center" ><h4> Créer une nouvelle categorie!!</h4></div>
                  <div id="main" className="card-img-top"></div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Nom categorie</label>
                      <input type="text" name="nomcategorie" value={this.state.categorie.nomcategorie} onInput={this.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>

                    <div className="mb-3">
                     <ButtonSpinner loading={this.state.loading} titre="Creer" />

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
    export default InsertCategorie;