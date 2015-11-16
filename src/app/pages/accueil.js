var React = require('react');
import { Link } from 'react-router';
var CreationSalon = require('../components/creationSalon');
var EntreeSalon  = require('../components/entreeSalon');

var Accueil = React.createClass({
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="jumbotron text-center">
                <h1>Linq</h1>
                <EntreeSalon />
                <CreationSalon />
                <div>
                    <h2><Link to="/about">A propos du jeu</Link></h2>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Accueil;
