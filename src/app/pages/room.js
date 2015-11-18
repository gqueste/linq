var React = require('react');
var Env = require('../../config/env');
var Firebase = require("firebase");
var Game  = require('../components/game');
var Lobby  = require('../components/lobby');

var Room = React.createClass({
    mixins: [ReactFireMixin],
    componentWillMount: function(){
        var env = new Env();
        var ref = new Firebase(env.getFirebaseURL()+"/rooms/"+this.props.params.roomId);
        var roomRef = this;
        ref.authWithCustomToken(env.getFirebaseKey(), function(error, authData){
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                roomRef.bindAsObject(ref, "currentRoom");
            }
        });
    },
    getInitialState: function() {
        return {
            currentRoom: {
                id:'',
                gameStarted:false
            }
        };
    },
    getPanel: function() {
        if(this.state.currentRoom.gameStarted){
            return (
                <Game currentRoom={this.state.currentRoom} firebaseRef={this.firebaseRefs['currentRoom']} />
            )
        }
        else{
            return (
                <Lobby currentRoom={this.state.currentRoom} firebaseRef={this.firebaseRefs['currentRoom']} />
            )
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="jumbotron">
                <div>
                    <h2>Hello Room {this.props.params.roomId}</h2>
                    {this.getPanel()}
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Room;
