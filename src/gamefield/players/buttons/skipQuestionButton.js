import React from'react';
import hide from "../../../functions/hide";
import show from "../../../functions/show";

function skipQuestion() {
    const table = document.querySelector('.questions-table');
    const questionText = document.querySelector('.question-text');
    hide(questionText);
    show(table);
}

function SkipQuestionButton() {
    return (<button className="button skip-button"
                    onClick={() => skipQuestion()}>
        Пропустить вопрос</button>);
}

export default SkipQuestionButton;