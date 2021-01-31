import React from 'react';
import Question from "./Question";

function Topic({topic, logger}) {
    return (
        <div className="topic">
            <div className="topic-name">{topic.topicName}</div>
            {topic.topicQuestions.map((question) => {
                return < Question question={question} key={`${topic.topicName}${question.price}`}logger={logger}/>
            })}
        </div>
    )
}

export default Topic;