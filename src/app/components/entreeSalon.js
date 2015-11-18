var React = require('react');

var EntreeSalon = React.createClass({
    getInitialState: function(){
        return {
            afficherConnexionSalon : false,
            idRoom : '',
            disableButton : true
        }
    },
    changeID: function(event) {
        this.setState({idRoom: event.target.value});
        this.setState({disableButton: event.target.value == ''});
    },
    enterRoom: function() {
        window.location.href = window.location.protocol + "//" + window.location.host + "/#/rooms/" + this.state.idRoom;
    },
    afficherConnexionSalon: function(){
        if(this.state.afficherConnexionSalon){
            return (
                <div>
                    <div className="row">
                        <div className="col-sx-12 col-md-6">
                            <input type="text" className="form-control" placeholder="Identifiant du salon" value={this.state.idRoom} onChange={this.changeID}/>
                        </div>
                        <div className="col-sx-12 col-md-6">
                            <button type="button" disabled={this.state.disableButton} className="btn btn-block btn-primary" onClick={this.enterRoom}>Entrer dans ce salon</button>
                        </div>
                    </div>
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
