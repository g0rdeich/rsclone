import React from 'react';
import Question from "./Question";

function Topic({topic}) {
	return (
        <div className="topic">
            <div className="topic-name">{topic.topicName}</div>
            {topic.topicQuestions.map((question) => {
								question.topicName = topic.topicName;
                return < Question question={question} key={`${topic.topicName}${question.price}`}/>
            })}
        </div>
    )
}

export default Topic;