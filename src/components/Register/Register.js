import React from 'react';
const SERVER = 'http://172.17.94.133:3010/';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (e) => this.setState({registerName: e.target.value})

    onEmailChange = (e) => this.setState({registerEmail: e.target.value})

    onPasswordChange = (e) => this.setState({registerPassword: e.target.value})

    onRegisterSubmit = () => {
        fetch(SERVER+'register', {
            method: 'post',
            headers: {'Content-type': "application/json"},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response=>{
            if(response.status === 400){
                throw response;
            } else {
                return response.json()
            }
        })
        .then(data => {
            this.props.updateUser(data);
        })
        .then(stuff=>{
            this.props.onRouteChange('home');
        })
        .catch(err=>{
            alert('User Could Not Be Added.');
        })
    }

    render(){
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center bg-white">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                    />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    />
                            </div>
                        </fieldset>
                        <div className="">
                            <button
                                onClick={() => this.onRegisterSubmit()} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                >Register</button>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
} 

export default Register;