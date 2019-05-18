import React from 'react';
const SERVER = 'http://172.17.94.133:3010/';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
        this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = (event) => {
        fetch(SERVER+'signin', {
            method: 'post',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response=>{
            if(response.status === 400){
                throw response;
            } else {
                return response.json();
            }
        })
        .then(data => {
            this.props.updateUser(data);
        })
        .then(stuff => {
            this.props.onRouteChange('home');
        })
        .catch(err=>alert('You got it wrong!'))
    }
    render(){
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center bg-white">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <button
                                onClick={() => this.onSubmitSignIn()} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                >Sign In</button>
                        </div>
                        <div className="lh-copy mt3">
                            <button 
                                onClick={() => this.props.onRouteChange('register')}
                                href="#0" 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                >Register</button>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;