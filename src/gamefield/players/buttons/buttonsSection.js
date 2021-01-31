import React from 'react';
import AnswerButton from "./answerButton";
import SkipQuestionButton from "./skipQuestionButton";

function ButtonsSection() {
    return (
        <div className="buttons-section">
            < AnswerButton />
            < SkipQuestionButton />
        </div>
    )
}

export default ButtonsSection;