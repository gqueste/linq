var React = require('react');

var Lobby = React.createClass({
    getInitialState: function(){
        return {
            currentPlayerName : '',
            disableButton: true
        }
    },
    changeCurrentPlayerName: function(event){
        this.setState({currentPlayerName: event.target.value});
        this.setState({disableButton: event.target.value == ''});
    },
    updateMessage: function(){
        this.props.firebaseRef.update({coucou: 'coucou'});
    },
    addPlayer: function(){
        var players = [];
        if(this.props.currentRoom.players){
            players = this.props.currentRoom.players;
        }
        players.push({
            name: this.state.currentPlayerName
        });
        this.props.firebaseRef.update(
            {
                players : players
            }
        )
    },
    getLobby: function(){
        if(!this.props.currentRoom.players){
            return (
                <div>
                    <strong>Pas encore de joueur</strong>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <input type="text" className="form-control" value={this.state.currentPlayerName} onChange={this.changeCurrentPlayerName} />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <button type="button" disabled={this.state.disableButton} className="btn btn-block btn-primary" onClick={this.addPlayer}>M'inscrire</button>
                        </div>
                    </div>
                </div>
            )
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                {this.getLobby()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Lobby;
