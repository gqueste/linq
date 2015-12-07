var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');
var LobbyPlayers = require('./lobby_players');

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
        var newIndex = players.length;
        players.push({
            name: this.state.currentPlayerName,
            ready: false
        });
        var refParent = this;
        this.props.firebaseRef.update(
            {
                players : players
            }, function(){
                CurrentPlayer.setPlayerID(newIndex);
                refParent.forceUpdate();
            }
        );
    },
    currentPlayerPanel: function(){
        if(CurrentPlayer.getPlayerID() > -1){
            return (
                <div>
                    Coucou {this.props.currentRoom.players[CurrentPlayer.getPlayerID()].name}
                </div>
            )
        }
        else {
            return (
                <div>
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
    playersPanel: function(){
        if(!this.props.currentRoom.players){
            return (
                <div>
                    <strong>Pas encore de joueur</strong>
                </div>
            )
        }
        else{
            return (
                <div>
                    <LobbyPlayers players={this.props.currentRoom.players} firebaseRef={this.props.firebaseRef} />
                </div>
            )
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                {this.playersPanel()}
                <div className="row text-center">
                    <strong>Le jeu se déclenche lorsque tous les joueurs ( > 4) indiquent qu'ils sont prêts.</strong>
                </div>
                {this.currentPlayerPanel()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Lobby;
