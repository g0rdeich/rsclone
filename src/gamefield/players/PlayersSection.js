import React from 'react';
import PlayerIcon from "./PlayerIcon";
import ButtonsSection from "./buttons/buttonsSection";

function PlayersSection({points}) {
    return (
        <div className="players-section">
            < PlayerIcon points={points}/>
            < ButtonsSection />
        </div>
    )
}

export default PlayersSection;