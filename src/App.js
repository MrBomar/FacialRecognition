import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import './App.css';

const app = new clarifai.App({
  apiKey: "685450f6661742ea9fcdcdf2c489db32"
})

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
    this.state ={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(data)
    console.log(height, width);
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

  onSubmit = (event) => {
    this.setState({imageUrl:this.state.input})
    if(this.state.input){
      app.models.predict(
        clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then( response => {
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
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>)
      case 'signin':
        return (<SignIn onRouteChange={this.onRouteChange} />)
      default:
        return (<Register onRouteChange={this.onRouteChange}/>)
    }
  }

  render() {
    return (
      <div className="App">
        <Particles params={params} className='particles'/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.displayThis()}
      </div>
    )
  }
}

export default App;
