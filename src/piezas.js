
import React from 'react';
import axios from 'axios';

export default class Piezas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            piezas: '',
        }

        console.log(props);
    }


    componentDidMount(){
        var that = this;
        axios({
            method: 'GET',
            url: 'http://localhost:8888/preexamen/index.php/API/getPiezas/obtenerPiezas',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .then(function(response){
            console.log(response);
            that.setState({
                piezas: JSON.stringify(response.data)
            });
          })
          .catch(function(response){
            console.log(response);
          })
    }



    salir(){
        //alert('salir');
        this.props.salir();
        console.log('salir 1');
    }


    render(){
        return(
            <div>
                {this.state.piezas}
                <br></br>
                <button
                    onClick={this.salir.bind(this)}
                >salir</button>
            </div>
        );
    }

}