import React from 'react';
import QuestionsSection from "./questions/QuestionsSection";
import PlayersSection from "./players/PlayersSection";

function GameSection(props) {
    return (
        <div className="game-section">
            < QuestionsSection topics={props.topics} logger={props.logger}/>
            < PlayersSection />
        </div>
    )
}

export default GameSection;