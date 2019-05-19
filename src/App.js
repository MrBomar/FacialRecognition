import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import './App.css';

export const SERVER = 'https://dry-shelf-22369.herokuapp.com/';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

const params = {
  particles: {
    number: {
      value: 30,
      density:{
        enable:true,
        value_area: 100
      }
    }
  }
}

class App extends Component{
  constructor() {
    super();
    this.state = initialState;
  }

  logOut = () => {
    this.setState(initialState);
  }

  updateUser = (obj) => {
    const {id, name, email, entries, joined} = obj;
    this.setState({
      isSignedIn: true,
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onImageSubmit = (event) => {
    this.setState({imageUrl:this.state.input}) 
    if(this.state.input){
      fetch(SERVER + 'imageurl', {
        method: 'post',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response=>response.json())
      .then(response => {
          if(response) {
            fetch(SERVER+'image',{
              method: 'put',
              headers: {'Content-Type': "application/json"},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(res=>res.json())
            .then(data=>{
              this.setState(Object.assign(this.state.user, {entries:data}))
            })
            .catch(err => {
              console.log('Could not update user')
            })
          }
          let data = response.outputs[0].data.regions[0].region_info.bounding_box;
          this.displayFaceBox(this.calculateFaceLocation(data));
        })
      .catch( err => {
          alert((err.status === 400)?
            "You must enter a valid URL":
            "The service is unavilable")
        });
    } else {
      alert('You must enter a URL.');
    }
  }

  onRouteChange = (text) => {
    this.setState({route:text, isSignedIn:(text === 'home')?true:false});
  }

  displayThis = () => {
    switch(this.state.route){
      case 'home':
        return (<div>
          <Logo />
          <Rank userRank={this.state.user.entries} userName={this.state.user.name}/>
          <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>)
      case 'signin':
        return (<SignIn SERVER={SERVER} onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>)
      default:
        return (<Register SERVER={SERVER} onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>)
    }
  }

  render() {
    return (
      <div className="App">
        <Particles params={params} className='particles'/>
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
          logOut={this.logOut}
          />
        {this.displayThis()}
      </div>
    )
  }
}

export default App;
