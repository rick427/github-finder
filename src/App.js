import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
   
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

    const searchUsers = async text => {
        setLoading(true);

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITID}&client_secret=
        ${process.env.REACT_APP_GITID_SECRET}`
        );

       setUsers(res.data.items);
       setLoading(false);
    };

    const getUser = async username => {
        setLoading(true)

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
        ${process.env.REACT_APP_GITID}&client_secret=
        ${process.env.REACT_APP_GITID_SECRET}`
        );
        
        setUser(res.data);
        setLoading(false);
    }

    const getUserRepos = async username => {
        setLoading(true);

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${process.env.REACT_APP_GITID}&client_secret=
        ${process.env.REACT_APP_GITID_SECRET}`
        );

       setRepos(res.data);
       setLoading(false);
    }

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    }

    const showAlert = (message, type) => {
      setAlert(message, type);
      setTimeout(() => setAlert(null), 3500)
    } 

        
        return (
            <Router>
                <div className="App">
                    <Navbar title="Github User Finder" icon="fab fa-github" />

                    <div className="container">
                        <Alert alert={alert} />

                        <Switch>
                            <Route exact path="/" render={props => (
                                <>
                                    <Search 
                                        searchUsers={searchUsers} 
                                        clearUsers={clearUsers} 
                                        showClear={users.length > 0 ? true : false} 
                                        setAlert={showAlert}
                                    />
                                    <Users loading={loading} users={users} />                    
                                </>
                              )}/>    
                            <Route exact path= "/about" component={About}/>
                            <Route exact path= "/user/:login" render={props => (
                                <User 
                                   {...props} 
                                   getUser={getUser} 
                                   user={user} 
                                   loading={loading}
                                   getUserRepos={getUserRepos}
                                   repos={repos} 
                                />
                            )} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    
}
export default App;
