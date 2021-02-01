import React from 'react';
import Topic from "./Topic";
import Context from '../../GlobalContext'
function QuestionsSection() {
	const { topics } = React.useContext(Context)
	return (
        <div className="questions-section">
            <div className="round-number">Тур 1</div>
            <div className="questions-table">
                {topics.map((topic) => {
                    return < Topic topic={topic} key={`${topic.topicName}`} />
                })}
            </div>
            <div className="question-text hidden"></div>
        </div>
    )
}

export default QuestionsSection;