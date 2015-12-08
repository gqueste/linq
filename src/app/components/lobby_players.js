var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');
var LobbyPlayers = React.createClass({
    launchGame : function() {
        this.props.firebaseRef.update(
            {
                gameStarted : true
            }
        );
    }
    ,
    readyPlayer: function(){
        var players = this.props.players;
        var parentRef = this;
        players[CurrentPlayer.getPlayerID()].ready = true;
        this.props.firebaseRef.child('players').child(CurrentPlayer.getPlayerID()).update(
            {
                ready : true
            }, function(){
                var allReady = true;
                parentRef.props.players.forEach(function(player) {
                    if(!player.ready){
                        allReady = false;
                    }
                });
                if(allReady && parentRef.props.players.length > 4){
                    parentRef.launchGame();
                }
            }
        );
    },
    getReadyPanel: function(){
        if(CurrentPlayer.getPlayerID() > -1){
            var player = this.props.players[CurrentPlayer.getPlayerID()];
            if(player.ready){
                return (
                    <div className="row text-center">
                        <div className="row">
                            <strong>Joueur {player.name}</strong>
                        </div>
                        <div className="row">
                            En attente des autres joueurs
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="row text-center">
                        <div className="row">
                            <strong>Joueur {player.name}</strong>
                        </div>
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.readyPlayer}>Je suis prêt !</button>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="row text-center">
                    <strong>Retrouvez-vous dans la liste ou inscrivez-vous</strong>
                </div>
            )
        }
    },
    getReadyLabel: function(player){
        if(player.ready){
            return (
                <i className="fa fa-check-circle-o fa-lg ready">
                </i>
            );
        }
        else {
            return (
                <i className="fa fa-times fa-lg notReady">
                </i>
            );
        }
    },
    selectPlayer : function(index){
        if(CurrentPlayer.getPlayerID() == -1){
            CurrentPlayer.setPlayerID(index);
            this.forceUpdate();
            this.props.lobby.forceUpdate();
        }
    },
    getPlayerLine : function(player, index){
        var listItemClass = 'list-group-item row';
        if(index == CurrentPlayer.getPlayerID()){
            listItemClass += ' active';
        }
        return (
            <a className={listItemClass} key={player.name} onClick={this.selectPlayer.bind(this, index)}>
                <div className="col-xs-10 col-md-10">
                    {player.name}
                </div>
                <div className="col-xs-2 col-md-2">
                    {this.getReadyLabel(player)}
                </div>
            </a>
        );
    },
    getPlayers : function(){
        var players = [];
        this.props.players.forEach(function(player, index) {
            players.push(this.getPlayerLine(player, index));
        }.bind(this));
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <div className="list-group">
                        {players}
                    </div>
                </div>
                <div className="col-xs-12 col-md-6">
                    {this.getReadyPanel()}
                </div>
            </div>
        )
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                {this.getPlayers()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default LobbyPlayers;
