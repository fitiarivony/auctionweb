import React, { Component } from 'react';
class Tab extends Component {
    format(date){
        
        if( new Date(date).toString() !== "Invalid Date" &&  typeof(date)==="string"){
           let daty =new Date(date);
           return daty.toLocaleString();
           
        }
        return date;
    }
    initurl=()=>{
        if (new URLSearchParams(window.location.search).get("authorization")!==undefined && 
        new URLSearchParams(window.location.search).get("authorization")!==null) {
            return "&&authorization="+new URLSearchParams(window.location.search).get("authorization");    
     }
     return "";
    }
    addInfoPerso(person){
        if (this.props.infoperso!==undefined 
            && this.props.infoperso!==null 
            && this.props.infoperso)   {
            let url="";


            return <td key={"link"+person[this.props.valuekey]}> <a className='btn btn-outline-danger' 
            href={this.props.link.value+"?"+this.props.valuekey+"="+person[this.props.valuekey]+this.initurl()}
            >{this.props.link.label}</a></td>
        }
    }
    formattingData(valeur,formatting){
        for (const format of formatting) {
            if(valeur===format.value){
                return format.label;
            }
        }
      
        return valeur;
    }
    render(){
        return(
            <>
            <table className='table table-bordered table-stripped text-center'>
               
                {
                   this.props.headers.map((header)=>{

                   return  <th key={header.value}>{header.label}</th> 
                   })
                }
                <th></th>
                {
                    this.props.data.map((data)=>{
                        return(
                            <tr key={data[this.props.valuekey]}>
                                {
                                    this.props.headers.map((header)=>{
                                        if (header.formatting!==undefined && header.formatting!==null) {
                                            return  <td key={data[header.value]}>{this.formattingData(data[header.value],header.formatting)}</td>;
                                        }else{
                                            return  <td key={data[header.value]}>{this.format(data[header.value])}</td>;
                                        }
                                     
                                    })
                                }
                                {this.addInfoPerso(data)}
                            </tr>
                        );
                    })
                }
               
            </table>
            
            </>
        );
    }
}
export default Tab;