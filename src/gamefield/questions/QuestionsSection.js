import React from 'react';
import Topic from "./Topic";

function QuestionsSection({topics, logger}) {
    return (
        <div className="questions-section">
            <div className="round-number">Тур 1</div>
            <div className="questions-table">
                {topics.map((topic) => {
                    return < Topic topic={topic} key={`${topic.topicName}`} logger={logger}/>
                })}
            </div>
            <div className="question-text hidden"></div>
        </div>
    )
}

export default QuestionsSection;