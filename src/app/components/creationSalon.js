var React = require('react');
var Env = require('../../config/env');
var Firebase = require("firebase");

var CreationSalon = React.createClass({
    getInitialState: function(){
        return {
            idRoomCreated: -1,
            afficherLien: false
        }
    },
    insertRoomCallback: function(error){
        if(error){
            console.log(error);
        }
        else{
            console.log("ok " + this.state.idRoomCreated);
            this.setState({afficherLien: true});
        }
    },
    insertRoom: function(ref){
        var roomsRef = ref.child("rooms");
        var refCreated = roomsRef.push({room:{id:'newRoom'}}, this.insertRoomCallback);
        this.setState({idRoomCreated: refCreated.key()});
    },
    connectionCallback: function(error, authData, ref){
        if (error) {
            console.log("Authentication Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            this.insertRoom(ref);
        }
    },
    createRoom: function(){
        var env = new Env();
        var ref = new Firebase(env.getFirebaseURL());
        var callback = this.connectionCallback;
        ref.authWithCustomToken(env.getFirebaseKey(), function(error, authData){
            callback(error, authData, ref);
        });
    },
    afficherLien: function(){
        if(this.state.afficherLien){
            return (
                <div>
                    <form>
                        <div className="row">
                            <input type="text" className="form-control" readOnly value={this.state.idRoomCreated} />
                        </div>
                    </form>
                </div>
            );
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                <div className="row atEase">
                    <button type="button" className="row btn btn-success" onClick={this.createRoom}>Créer un salon</button>
                </div>
                {this.afficherLien()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default CreationSalon;
