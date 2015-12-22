var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');
var Firebase = require("firebase");
var Env = require('../../config/env');

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
    componentWillMount: function(){
        var refRoot = this.props.firebaseRef.root();
        console.log(refRoot.toString());
        var ref = refRoot.child('words');
        console.log(ref.toString());
        this.bindAsObject(ref, "wordsAvailable");
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
        this.resetRoles();
        this.giveRoles();
        this.setWord();
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
