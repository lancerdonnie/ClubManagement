import Home from 'pages/Home';
import NavBar from 'layout/NavBar';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyClubs from 'pages/MyClubs';
import CreateClub from 'pages/CreateClub';
import Club from 'pages/Club';
import Invite from 'pages/Invite';

const Main = () => {
  return (
    <div className="App h-screen overflow-auto flex flex-col">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/myclubs" component={MyClubs} />
        <Route path="/myclubs/create" component={CreateClub} />
        <Route path="/club/:id" component={Club} />
        <Route path="/invite/:id" component={Invite} />
      </Switch>
    </div>
  );
};

export default Main;
