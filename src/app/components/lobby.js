var React = require('react');

var Lobby = React.createClass({
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                {this.props.currentRoom.id}
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Lobby;
