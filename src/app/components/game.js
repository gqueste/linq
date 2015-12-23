var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');
var Firebase = require("firebase");
var Env = require('../../config/env');
var Turn1 = require('./turn1');
var Turn2 = require('./turn2');

var Game = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
        return {
            initialisation: true,
            wordsAvailable : {
                possibilities : []
            }
        };
    },
    componentDidMount: function(){
        var env = new Env();
        $.get(env.getFirebaseURL()+"/words.json", function(result) {
            if (this.isMounted()) {
                this.setState({
                    words: result
                });
                this.initiateGame();
            }
        }.bind(this));
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
    setWord: function(){
        var parentsRef = this;
        var words = this.state.words.possibilities;
        var index = Math.floor(Math.random() * words.length);
        var choosenWord = words[index].name;
        this.props.firebaseRef.update(
            {
                word : choosenWord
            }, function(){
                parentsRef.setState({initialisation: false});
            }
        );
    }
    ,
    initiateGame: function(){
        if(!this.props.currentRoom.word){
            this.resetRoles();
            this.giveRoles();
            this.setWord();
        }
        else {
            this.setState({initialisation: false});
        }
    },
    getRoleDisplay: function(){
        if(this.props.currentRoom.players[CurrentPlayer.getPlayerID()].role == 'spy'){
            return (
                <div>
                    <h3>Vous êtes un espion !</h3>
                    <h4>Votre rôle est de trouver l'autre espion dans le salon sans vous faire remarquer. Le mot commun que vous partagez est :</h4>
                    <strong>{this.props.currentRoom.word}</strong>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Vous êtes un contre-espion !</h3>
                    <h4>Votre rôle est d'identifier les 2 espions présents dans le salon qui ont un mot en commun.</h4>
                </div>
            )
        }
    },
    getGamePanel: function(){
        if(!this.props.currentRoom.firstDone){
            return (
                <div>
                    <Turn1 currentRoom={this.props.currentRoom} firebaseRef={this.props.firebaseRef} game={this}/>
                </div>
            )
        }
        else {
            if(!this.props.currentRoom.secondDone){
                return(
                    <div>
                        <Turn2 currentRoom={this.props.currentRoom} firebaseRef={this.props.firebaseRef} game={this}/>
                    </div>
                )
            }
        }
    },
    getPlayerWord1: function(player) {
        if(player.word1){
            return (
                <span>{player.word1}</span>
            )
        }
        else {
            return (
                <span></span>
            )
        }
    },
    getPlayerWord2: function(player) {
        if(player.word2){
            return (
                <span>{player.word2}</span>
            )
        }
        else {
            return (
                <span></span>
            )
        }
    },
    getPlayerLine : function(player, index){
        var listItemClass = 'list-group-item row';
        if(index == CurrentPlayer.getPlayerID()){
            listItemClass += ' active';
        }
        return (
            <a className={listItemClass} key={player.name}>
                <div className="col-xs-4 col-md-4">
                    {player.name}
                </div>
                <div className="col-xs-4 col-md-4 text-center">
                    {this.getPlayerWord1(player)}
                </div>
                <div className="col-xs-4 col-md-4 text-center">
                    {this.getPlayerWord2(player)}
                </div>
            </a>
        );
    },
    getPlayersPanel: function(){
        var players = [];
        this.props.currentRoom.players.forEach(function(player, index){
            players.push(this.getPlayerLine(player, index));
        }.bind(this));
        return (
            <div className='row list-group'>
                {players}
            </div>
        )
    },
    displayGame: function(){
        if(this.state.initialisation){
            return (
                <div className='text-center'>
                    <strong>Attribution des rôles en cours</strong>
                </div>
            );
        }
        else {
            return (
                <div className='text-center'>
                    <h2>{this.props.currentRoom.players[CurrentPlayer.getPlayerID()].name}</h2>
                    {this.getRoleDisplay()}
                    {this.getGamePanel()}
                    {this.getPlayersPanel()}
                </div>
            )
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                {this.displayGame()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Game;
