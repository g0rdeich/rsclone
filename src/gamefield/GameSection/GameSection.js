import React from 'react';
import QuestionsSection from "../questions/QuestionsSection";
import PlayersSection from "../players/PlayersSection";

function GameSection({topics, logger}) {
    return (
        <div className="game-section">
            < QuestionsSection topics={topics} logger={logger}/>
            < PlayersSection />
        </div>
    )
}

export default GameSection;