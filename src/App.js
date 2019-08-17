
import React  from 'react';
import axios from 'axios';

import Piezas from './piezas';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: '',
      pass: '',
      sesion: false,
    }
  }


  campoUser(e){
    console.log(e.target.value);
    this.setState({
      user: e.target.value,
    });
  }

  campoPass(e){
    console.log(e.target.value);
    this.setState({
      pass: e.target.value,
    });
  }


  componentDidMount(){

    var sesion = localStorage.getItem('login');
    console.log(sesion);

    if(sesion === null){
      localStorage.setItem('login', false);
    }

    sesion = localStorage.getItem('login');

    // this.setState({
    //   sesion: sesion,
    // });



    
  }

  

  login(){
    // alert('state.user: ' + this.state.user + ', state.ass: ' + this.state.pass);
    
    var that = this;
    if(this.state.user !== '' && this.state.pass !== ''){

      axios({
        method: 'post',
        url: 'http://localhost:8888/preexamen/index.php/API/login',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: 'email=' + this.state.user + '&pass=' + this.state.pass
      })
      .then(function(response){
        console.log(response);

        if(response.data.length > 0){
          //alert('si hay user');
          that.setState({
            sesion: true,
          });

          localStorage.setItem('login', true);
        }else{
          alert('user/password invalido');
        }


      })
      .catch(function(response){
        console.log(response);
      })

    }else{
      alert('llena los campos');
    }
  }


  salir(){

    console.log('salir 2');
    localStorage.setItem('login', false);
    this.setState({
      sesion: false,
    });
    
  }




  render(){


    if(this.state.sesion === false){
      return(
        <div>
          <input
            value={this.state.user}
            onChange={this.campoUser.bind(this)}
          ></input>
          <br></br>
          <input
            value={this.state.pass}
            onChange={this.campoPass.bind(this)}
          ></input>
          <br></br>
          <button
            onClick={this.login.bind(this)}
          >click</button>
        </div>

      );
    }else if(this.state.sesion === true){
      return(
        <Piezas salir={this.salir.bind(this)} />
      );
    }
    
  }
}