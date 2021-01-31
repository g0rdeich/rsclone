import React from 'react';
import Avatar from "../../components/Avatar";

function PlayerIcon() {
    return (
        <div className="player-icon">
            <div className="player-points">0</div>
            <div>Name</div>
            < Avatar />
        </div>

    )
}

export default PlayerIcon;