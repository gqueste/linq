var React = require('react');
import { Link } from 'react-router';

var Accueil = React.createClass({
    getInitialState: function(){
        return {
            afficherConnexionSalon : false
        }
    },
    hello: function(){
        return (
            <div>
                <h2>Only YOUUUUU</h2>
            </div>
        )
    },
    afficherConnexionSalon: function(){
        if(this.state.afficherConnexionSalon){
            return (
                <div>
                    Hello !!!
                </div>
            )
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="jumbotron text-center">
                <h1>Linq</h1>
                {this.hello()}
                <div className="row atEase">
                    <button type="button" className="row btn btn-primary">Entrer un salon</button>
                </div>
                {this.afficherConnexionSalon()}
                <div className="row atEase">
                    <button type="button" className="row btn btn-success">Créer un salon</button>
                </div>
                <div>
                    <h2><Link to="/about">A propos du jeu</Link></h2>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Accueil;
