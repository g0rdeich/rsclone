import React from'react';
import show from "../../../functions/show";
import changeHostText from "../../../functions/changeHostText";

function showSubmitArea() {
    const textArea = document.querySelector('.answer-text');
    const submitBtn = document.querySelector('.submit-button');
    show(textArea);
    show(submitBtn);
    changeHostText('Ваш ответ?');
}

function AnswerButton() {
    return (<button className="button answer-button"
                    onClick={() => showSubmitArea()}>
        Ответить</button>);
}

export default AnswerButton;