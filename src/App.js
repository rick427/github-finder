import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
// import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './components/pages/Home';
import Error from './components/pages/Error';

const App = () => {
   
    //  async componentDidMount(){
    //     this.setState({loading: true});

    //     const res = await axios.get(`https:api.github.com/users?client_id=
    //          ${process.env.REACT_APP_GITID}&client_secret=
    //          ${process.env.REACT_APP_GITID_SECRET}`
    //      );

    //     this.setState({
    //         users: res.data,
    //         loading: false
    //     })
    //  };
 
    return (
        <GithubState>
        <AlertState>
        <Router>
            <div className="App">
                <Navbar title="Github User Finder" icon="fab fa-github" />

                <div className="container">
                    <Alert/>

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path= "/about" component={About}/>
                        <Route exact path= "/user/:login" component={User} />
                        <Route component={Error}/>
                    </Switch>
                </div>
            </div>
        </Router>
        </AlertState>
        </GithubState>
    )
    
}
export default App;
