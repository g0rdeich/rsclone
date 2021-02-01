import React from'react';
import hide from "../../../functions/hide";
import show from "../../../functions/show";
import Context from "../../../GlobalContext";

function skipQuestion() {
    const table = document.querySelector('.questions-table');
    const questionText = document.querySelector('.question-text');
    const info = document.querySelector('.info');
    hide(info);
    hide(questionText);
    show(table);
}

function SkipQuestionButton() {
    const {btns} = React.useContext(Context);
    return (<button className="button skip-button" disabled={btns[0].isBlocked}
                    onClick={() => skipQuestion()}>
        Пропустить вопрос</button>);
}

export default SkipQuestionButton;