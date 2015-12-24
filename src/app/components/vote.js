var React = require('react');
var CurrentPlayer = require('../services/currentPlayer');

var Vote = React.createClass({
    getInitialState: function() {
        return {
            disableButton: true,
            spyVote : -1
        };
    },
    changeSpyChoice: function(event){
        this.setState({disableButton: false});
        this.setState({spyVote: event.target.value});
    },
    getSpyPlayerLine: function(player, index){
        var value = this.state.spyVote == index;
        return(
            <div class="radio" key={player.name}>
                <label>
                    <input type='radio' name='optionsPlayerSpy' id={index} value={index} checked={value} onClick={this.changeSpyChoice} />
                    {player.name} : {player.word1} - {player.word2}
                </label>
            </div>
        )
    },
    isVoteOver: function(){
        var ret  =true;
        this.props.currentRoom.players.forEach(function(player){
            if(!player.voteDone){
                ret = false;
            }
        });
        return ret;
    },
    spyVote: function(){
        var parentRef = this;
        this.props.firebaseRef.child('players').child(CurrentPlayer.getPlayerID()).update({
            voteDone : true,
            vote : this.state.spyVote
        }, function(){
            if(parentRef.isVoteOver()){
                parentRef.props.game.forceUpdate();
            }
        });
    },
    getSpyPanel: function(){
        var spyPlayerLines = [];
        this.props.currentRoom.players.forEach(function(player, index){
            if(index != CurrentPlayer.getPlayerID()){
                spyPlayerLines.push(this.getSpyPlayerLine(player, index));
            }
        }.bind(this));
        return(
            <div>
                <div className='row'>
                    <strong>Trouvez votre collègue espion.</strong>
                </div>
                <div className = 'row'>
                    {spyPlayerLines}
                </div>
                <div className='row'>
                    <button type="button" disabled={this.state.disableButton} className="btn btn-block btn-primary" onClick={this.spyVote}>Voter</button>
                </div>
            </div>
        )
    },
    getCounterSpyPanel: function(){
        return (
            <div>
            </div>
        )
    },
    getInputPanel: function(){
        var parentRef = this;
        if(this.isVoteOver()){
            this.props.firebaseRef.update(
                {
                    voteDone : true
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
        else{
            var player = this.props.currentRoom.players[CurrentPlayer.getPlayerID()];
            if(!player.voteDone){
                if(player.role == 'spy'){
                    return this.getSpyPanel();
                }
                else{
                    return this.getCounterSpyPanel();
                }
            }
            else{
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

export default Vote;
