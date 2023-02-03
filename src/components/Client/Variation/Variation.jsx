import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Header from '../Header/Header';
import Navclient from '../Header/Navclient';
import FetchHelper from '../../../Helper/FetchHelper';
import URLHelper from '../../../Helper/URLHelper';
import Loader from '../../Generalized/Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function Variation() {
  let [variations,setVariations]=useState([]);
  let [labels,setLabels]=useState([]);
  let [values,setValues]=useState([]);
  let [loading,setLoading]=useState(false);
useEffect(()=>{
 
    init();
  
 
});
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'center',
    },
    title: {
      display: true,
      text: 'Variation des soldes',
    },
  },
};

const init=async ()=>{
  if (localStorage.getItem("idutilisateur")!==undefined &&  localStorage.getItem("idutilisateur")!==null && new URLSearchParams(window.location.search).get("authorization")!==undefined) {
    let header={
      authorization:(new URLSearchParams(window.location.search).get("authorization"))
    }  
    let data = await FetchHelper.getData(URLHelper.urlgen("utilisateur/getvariation/"+localStorage.getItem("idutilisateur")), header);
     console.log(data);
     if(data.status !==undefined){
      alert("Code "+data.status+":"+data.message);
      window.location.href="/connexion";
     }else{
      setVariations(data.data);
      formatresult();
     }
   }else{
      window.location.href="/connexion";
   }
}
const formatresult=()=>{
    let libelle=[];
    let valeurs=[];
   let sample = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];
    for (const lib of variations) {
        libelle.push(sample[lib.mois]+"  "+lib.annee)
        valeurs.push(lib.prix)
    }
    setValues(valeurs);
  setLabels(libelle);
  setLoading(false);
}

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: values,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};



  return (
  <>
  <Header/>
  <Navclient/>
  { loading ? (
        <Loader loading={loading} />
        ) : (
  <div className='container'>
  <Bar options={options} data={data} />
  </div>
        )}

  </>
  );
}
