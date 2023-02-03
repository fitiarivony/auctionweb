import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Header from '../Header/Header';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import NavAdmin from '../Header/NavAdmin';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


export function Statistique() {
  let [stats,setstats]=useState(null);
useEffect(()=>{
 if (stats===null) {
  init();
 }
});

const init=async ()=>{
  if (localStorage.getItem("idadministrateur")!==null && new URLSearchParams(window.location.search).get("authorization")!==null) {
    let data = await FetchHelper.getData(URLHelper.urlgen("statistique"));
     console.log(data);
     if(data.status !==undefined){
      alert("Code "+data.status+":"+data.message);
   
     }else{
      setstats(data.data);
     }
   }else{
      window.location.href="/homeadmin?authorization="+localStorage.getItem("idadministrateur");
   }
}


const getNomCategorie=() =>{
  var tableau = [];
  stats?.categorie.forEach(element => {
    // console.log(element);
    tableau.push(element.nomcategorie);
  });
  // console.log(tableau);
  return tableau;
}

const getValueCategorie=()=> {
  var tableau = [];
  stats?.categorie.forEach(element => {
    // console.log(element);
    tableau.push(element.nombre);
  });
  return tableau;
}

const  getNomProduit=()=> {
  var tableau = [];
  let j = 0;
  stats?.enchere_rencheri.forEach(element => {
    if (j === 10) return tableau;
    tableau.push(element.nomproduit);
    j++;
  });
  return tableau;
}
const getNombreRencheri=()=> {
  var tableau = [];
  let i = 0;
  stats?.enchere_rencheri.forEach(element => {
    if (i === 10) return tableau;
    tableau.push(element.nombre);
    i++;
  });
  return tableau;
}



const data = {
  labels: getNomCategorie(),
  datasets: [{
      data:getValueCategorie(),
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#00FF00','#800080','#FFA500'],
      hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#00FF00','#800080','#FFA500']
  }]
};

const data1 = {
  labels: getNomProduit(),
  datasets: [{
      data:getNombreRencheri(),
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#00FF00','#800080','#FFA500'],
      hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#00FF00','#800080','#FFA500']
  }]
};

const getHeaderRencherisseur=()=>{
  var tableau = [];
  let sample = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];
  stats?.nombre_rencherisseur.forEach(element => {
    tableau.push(sample[element.mois]+"  "+element.annee);
  });
  return tableau;
}
const getDataRencherisseur=()=>{
  var tableau = [];
  stats?.nombre_rencherisseur.forEach(element => {
    tableau.push(element.nbUtilisateur);
  });
  return tableau;
}

const data2 = {
  labels: getHeaderRencherisseur(),
  datasets: [{
      data:getDataRencherisseur(),
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#00FF00','#800080','#FFA500'],
      hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#00FF00','#800080','#FFA500']
  }]
};

  return (
  <>
  <Header/>
  <NavAdmin/>
  
  <div className='container'>
    <div className='row'>
  <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1"> Moyenne mise</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800" id="moyennemise">{stats?.moyenne_mise} Ar</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Moyenne commission</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800" id="moyennecommission">{stats?.moyenne_commission} %</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            </div>





    <div className='row'>
      <div className='col'>

      <div id="card" classname="card border-secondary mb-3" style={{ maxWidth: "500rem" }}>
          <h2 id="card-header" className="card-header text-center">Categorie le plus rencheri</h2>
      <div id="card-body" className="card-body bg-light text-dark">
      <Pie 
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Categorie le plus rencheri'
          }
        }}
        data={data} />
        </div></div>

      </div>
      <div className='col'>

      <div id="card" classname="card border-secondary mb-3" style={{ maxWidth: "500rem" }}>
          <h2 id="card-header" className="card-header text-center">Enchere le plus rencheri</h2>
      <div id="card-body" className="card-body bg-light text-dark">
      <Pie 
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Enchere le plus rencheri'
          }
        }}
        data={data1} />
        </div>
        </div>


      </div>
      
    </div>

    <div className='row'>
    <div className='col-md-6'>
      
      <Bar options={{
  responsive: true,
  plugins: {
    legend: {
      position: 'center',
    },
    title: {
      display: true,
      text: 'Nombre de rencherisseur par mois',
    },
  },
}} data={data2} />

      </div>
     
      

    </div>
  
  </div>

  </>
  );
}
