'use strict';

var React = require('react');

import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
var Accueil = require('./pages/accueil');
var About = require('./pages/about');

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

render((
    /*jshint ignore:start */
    <Router>
        <Route path="/index" component={Accueil}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="*" component={Accueil}/>
    </Router>
    /*jshint ignore:end */
), document.getElementById('app'));
