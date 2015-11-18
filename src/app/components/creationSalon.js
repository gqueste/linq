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
            console.log("created: " + this.state.idRoomCreated);
            this.setState({afficherLien: true});
        }
    },
    insertRoom: function(ref){
        var roomsRef = ref.child("rooms");
        var refCreated = roomsRef.push({
            id:'newRoom',
            gameStarted: false
        }, this.insertRoomCallback);
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
    getNewRoomAddress: function() {
        return window.location.protocol + "//" + window.location.host + "/#/rooms/" + this.state.idRoomCreated;
    },
    redirectToRoom: function(){
        window.location.href = this.getNewRoomAddress();
    },
    afficherLien: function(){
        if(this.state.afficherLien){
            return (
                <div className="alert alert-success" role="alert">
                    <p><strong>Votre salon a été créé !</strong></p>
                    <p>Donnez le lien ci-dessous à vos amis, et commencez à jouer !</p>
                    <form>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <input type="text" className="form-control" readOnly value={this.getNewRoomAddress()} />
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <button type="button" className="btn btn-block btn-primary" onClick={this.redirectToRoom}>Entrer dans le salon</button>
                            </div>
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
