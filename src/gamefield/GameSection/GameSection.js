import React from 'react';
import QuestionsSection from "../questions/QuestionsSection";
import PlayersSection from "../players/PlayersSection";

function GameSection() {
    return (
        <div className="game-section">
            < QuestionsSection  />
            {/*< PlayersSection />*/}
        </div>
    )
}

export default GameSection;