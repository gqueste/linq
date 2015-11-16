var React = require('react');

var EntreeSalon = React.createClass({
    getInitialState: function(){
        return {
            afficherConnexionSalon : false
        }
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
    toogleAfficherConnexionSalon: function(){
        this.setState({afficherConnexionSalon: !this.state.afficherConnexionSalon});
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                <div className="row atEase">
                    <button type="button" className="row btn btn-primary" onClick={this.toogleAfficherConnexionSalon}>Entrer un salon</button>
                </div>
                {this.afficherConnexionSalon()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default EntreeSalon;
