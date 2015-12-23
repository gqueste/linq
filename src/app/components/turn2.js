var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');

var Turn2 = React.createClass({
    getInitialState: function() {
        return {
            word2 : '',
            disableButton: true
        };
    },
    changeWord: function(event) {
        this.setState({word2: event.target.value});
        this.setState({disableButton: event.target.value == ''});
    },
    isTurnOver : function(){
        var ret  =true;
        this.props.currentRoom.players.forEach(function(player){
            if(!player.word2){
                ret = false;
            }
        });
        return ret;
    },
    confirmWord: function(){
        var parentRef = this;
        this.props.firebaseRef.child('players').child(CurrentPlayer.getPlayerID()).update(
            {
                word2 : this.state.word2
            }, function(){
                if(parentRef.isTurnOver()){
                    parentRef.props.game.forceUpdate();
                }
            }
        );
    },
    getInputPanel: function(){
        var parentRef = this;
        if(this.isTurnOver()){
            this.props.firebaseRef.update(
                {
                    secondDone : true
                }, function(){
                    parentRef.props.game.forceUpdate();
                    return (
                        <div>
                            Tout le monde a fini.
                        </div>
                    )
                }
            );
        }
        else {
            var currentPlayer = this.props.currentRoom.players[CurrentPlayer.getPlayerID()];
            if(!currentPlayer.word2){
                return (
                    <div>
                        <div className='row text-center'>
                            Entrez un mot
                        </div>
                        <div className='row'>
                            <div className="col-sx-12 col-md-8">
                                <input type="text" className="form-control" placeholder="Second mot" value={this.state.word2} onChange={this.changeWord}/>
                            </div>
                            <div className="col-sx-12 col-md-4">
                                <button type="button" disabled={this.state.disableButton} className="btn btn-block btn-primary" onClick={this.confirmWord}>Confirmer ce mot</button>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        En attente des autres joueurs.
                    </div>
                )
            }
        }
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                {this.getInputPanel()}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Turn2;
