var playerID = -1

module.exports = {
    getPlayerID(){
        return playerID;
    },
    setPlayerID(id){
        playerID = id;
    }
};
