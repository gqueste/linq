var React = require('react');

var CreationSalon = React.createClass({
    makeid: function() {
        var idSize = 5;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < idSize; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    createRoom: function(){
        var roomId = this.makeid();
        alert(roomId);
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="row atEase">
                <button type="button" className="row btn btn-success" onClick={this.createRoom}>Créer un salon</button>
            </div>
            /*jshint ignore:end */
        );
    }
});

export default CreationSalon;
