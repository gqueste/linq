var React = require('react');

var Room = React.createClass({
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="jumbotron">
                <div>
                    <h2>Hello Room {this.props.params.roomId}</h2>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

export default Room;
