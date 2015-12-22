var React = require('react');

var Game = React.createClass({
    getInitialState: function() {
        return {
            initialisation: true
        };
    },
    componentDidMount: function(){
        this.initiateGame();
    },
    saveRoles: function(){
        var players = this.props.currentRoom.players;
        var parentRef = this;
        players.forEach(function(player, index){
            parentRef.props.firebaseRef.child('players').child(index).update(
                {
                    role : player.role
                }
            );
        });
        this.setState({initialisation: false});
    },
    setSpy : function(){
        var players = this.props.currentRoom.players;
        var index = Math.floor(Math.random() * players.length);
        if(players[index].role != 'spy'){
            players[index].role = 'spy';
        }
        else {
            this.setSpy();
        }
    },
    giveRoles: function() {
        this.setSpy();
        this.setSpy();
        this.saveRoles();
    },
    resetRoles: function(){
        this.props.currentRoom.players.forEach(function(player){
            player.role = 'counterSpy';
        });
    },
    initiateGame: function(){
        this.resetRoles();
        this.giveRoles();
    },
    displayGame: function(){

    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                THIS IS THE GAME !!
                {this.displayGame()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Game;
