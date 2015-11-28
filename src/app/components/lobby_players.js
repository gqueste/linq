var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');

var LobbyPlayers = React.createClass({
    getReadyPanel: function(player){
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
    getPlayers : function(){
        var players = [];
        this.props.players.forEach(function(player) {
            players.push(
                <li className="list-group-item row" key={player.name}>
                    <div className="col-xs-10 col-md-10">
                        {player.name}
                    </div>
                    <div className="col-xs-2 col-md-2">
                        {this.getReadyPanel(player)}
                    </div>
                </li>
            );
        }.bind(this));
        return (
            <div>
                <ul className="list-group">
                    {players}
                </ul>
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
