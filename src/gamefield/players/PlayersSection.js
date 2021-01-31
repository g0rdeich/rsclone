import React from 'react';
import PlayerIcon from "./PlayerIcon";
import ButtonsSection from "./buttons/buttonsSection";

function PlayersSection() {
    return (
        <div className="players-section">
            < PlayerIcon />
            < ButtonsSection />
        </div>
    )
}

export default PlayersSection;