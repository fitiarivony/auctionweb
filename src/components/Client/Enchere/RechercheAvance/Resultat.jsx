import React, { Component } from 'react';
import Loader from '../../../Generalized/Loader';
class Resultat extends Component{
    state={

    }
    format(date){
        
        if( new Date(date).toString() !== "Invalid Date" &&  typeof(date)==="string"){
           let daty =new Date(date);
           return daty.toLocaleString();
           
        }
        return date;
    }
    render() {
        return (
            <>
              { this.state.loading ? (
        <Loader loading={this.state.loading} />
        ) : (
          <table className='table table-bordered table-stripped text-center'>
               <tr>
                <th>Nom produit</th>
                <th>Descri</th>
                <th>Date</th>
                <th>Durée(mn)</th>
                <th>Prix</th>
                <th>Nom Categorie</th>
            </tr>

            {
                this.props.result.map(resultat=>
                    <tr key={resultat.enchere.idenchere}>
                        <td>{resultat.prod.nomproduit}</td>
                        <td>{resultat.prod.descri}</td>
                        <td>{this.format(resultat.enchere.dateenchere)}</td>
                        <td>{resultat.enchere.dureeenchere}</td>
                        <td>{resultat.enchere.prixenchere}</td>
                        <td>
                        <ul className="list-group">
                        {resultat.categorie.map(categorie=> 
                                <li className='list-group-item' key={categorie.idcatgorie}>{categorie.nomcategorie}</li>
                          
                            )}
                              </ul>
                              </td>
                    </tr>


                )                
            }



            </table>
        )}
            </> 
        );
    }
}
export default Resultat;