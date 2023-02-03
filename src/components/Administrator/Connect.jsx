import React, { Component } from 'react';
import Header from './Header/Header';
import URLHelper from '../../Helper/URLHelper';
import FetchHelper from '../../Helper/FetchHelper';

class Connect extends Component {
    state={
        admin:{
            identifiant:"admin",
            mdp:"admin"
        }
       
      }
      
     change=(e)=>{
        let admin=this.state.admin;
        admin[e.target.name]=e.target.value;
        this.setState(admin);
    }
    handleSumbit=(event)=>{
      event.preventDefault();
     this.login();
      
  }
  login=async ()=>{
    console.log("tonga ato");

    let header={"Content-Type": "application/json"};
    let data= await FetchHelper.getDataPost(URLHelper.urlgen("admin/login"),this.state.admin,header);
    if(data.status===undefined || data.status===null){
      localStorage.setItem("idadministrateur",data.data.idadministrateur);
       window.location.href='/homeadmin?authorization='+data.data.token;
    }else{
      alert("Error "+data.status+":"+data.message);
    }
  }
       
    render() {
        return (
            <>
            <Header  ></Header>
             <br/>

             <div className="row">
        <div className="col"></div>
        <div className="col">
          <div id="details">
            <div className="card" style={{width: "18rem"}}>
              <form id="myForm" onSubmit={this.handleSumbit}>
                <div id="card-header" className="card-header text-center" ><h4> Connectez-vous en tant qu'Administrateur!!</h4></div>
             <div id="main" className="card-img-top"></div>
             <div className="card-body">
               <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Identifiant</label>
                <input type="text"  name="identifiant" value={this.state.admin.identifiant} onInput={this.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              
               </div>

               <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Mot de passe</label>
                <input type="password"  value={this.state.admin.mdp}  name="mdp" onInput={this.change} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              
               </div>
               <div className="mb-3">
                
                <input type="submit" className="btn btn-success" value="Connexion" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              
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
export default Connect;