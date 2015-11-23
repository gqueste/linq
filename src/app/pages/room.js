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
        this.bindAsObject(ref, "currentRoom");
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
                <Lobby roomID={this.props.params.roomId} currentRoom={this.state.currentRoom} firebaseRef={this.firebaseRefs['currentRoom']} />
            )
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                <div>
                    <h2>Hello Room {this.props.params.roomId}</h2>
                </div>
                {this.getPanel()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Room;
