import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import  {
  BrowserRouter,Routes,Route
  } from "react-router-dom";  
import Choice from './components/Choice';
import HomeClient from './components/Client/HomeClient';
import ListeEnchere from './components/Client/Enchere/ListeEnchere';
import FicheEnchere from './components/Client/Enchere/FicheEnchere';
import HistoriqueEnchere from './components/Client/Enchere/Historique/HistoriqueEnchere';
import HistoriqueRenchere from './components/Client/Enchere/Historique/HistoriqueRenchere';
import Connexion from './components/Client/Connexion';
import Recheche from './components/Client/Enchere/RechercheAvance/Recherche';
import Connect from './components/Administrator/Connect';
import {Variation} from './components/Client/Variation/Variation';
import HomeAdmin from './components/Administrator/HomeAdmin';
import ListeUtilisateur from './components/Administrator/Utilisateurs/ListeUtilisateur';
import EnchereEnCours from './components/Administrator/Enchere/EnchereEncours';
import Listecategorie from './components/Administrator/Categorie/ListeCategorie';
import UpdateCategorie from './components/Administrator/Categorie/Updatecategorie';
import InsertCategorie from './components/Administrator/Categorie/InsertCategorie';
import ApprouverMouvement from './components/Administrator/Mouvement/ApprouverMouvement';
import Approuver from './components/Administrator/Mouvement/Approuver';
import { Statistique } from './components/Administrator/Statistique/Statistique';
import Renchere from './components/Client/Enchere/Renchere';
import Comission from './components/Administrator/Comission/Comission';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Routes>
      <Route path={'/'} element={<Choice/>}></Route>


      {/* Client */}
      <Route path={'/homeclient'} element={<HomeClient/>}></Route>
      <Route path={'/encheres'} element={<ListeEnchere/>}></Route>
      <Route path={'/enchere'} element={<FicheEnchere/>}></Route>
      <Route path={'/encheres/historique'} element={<HistoriqueEnchere/>}></Route>
      <Route path={'/connexion'} element={<Connexion/>}></Route>
      <Route path={'/renchere'} element={<HistoriqueRenchere/>}></Route>
      <Route path={'/recherche'} element={<Recheche/>}></Route>
      <Route path={'/variation'} element={<Variation/>}></Route>
      <Route path={'/rencherir'} element={<Renchere/>}></Route>
      
      {/* Admin */}
      <Route path={'/connect'} element={<Connect/>}></Route>
      <Route path={'/homeadmin'} element={<HomeAdmin/>}></Route>
      <Route path={'/utilisateur'} element={<ListeUtilisateur/>}></Route>
      <Route path={'/enchere/encours'} element={<EnchereEnCours/>}></Route>
      <Route path={'/categories'} element={<Listecategorie/>}></Route>
      <Route path={'/categorie/update'} element={<UpdateCategorie/>}></Route>
      <Route path={'/categorie'} element={<InsertCategorie/>}></Route>
      <Route path={'/mouvement'} element={<ApprouverMouvement/>}></Route>
      <Route path={'/approuver'} element={<Approuver/>}></Route>
      <Route path={'/statistique'} element={<Statistique/>}></Route>
      <Route path={'/comission'} element={<Comission/>}></Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
