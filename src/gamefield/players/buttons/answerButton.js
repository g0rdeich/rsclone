import React from'react';
import show from "../../../functions/show";
import changeHostText from "../../../functions/changeHostText";
import Context from "../../../GlobalContext";

function showSubmitArea() {
    const textArea = document.querySelector('.answer-text');
    const submitBtn = document.querySelector('.submit-button');
    show(textArea);
    show(submitBtn);
    changeHostText('Ваш ответ?');
}

function AnswerButton() {
    const {btns} = React.useContext(Context);
    return (<button className="button answer-button" disabled={btns[0].isBlocked}
                    onClick={() => showSubmitArea()}>
        Ответить</button>);
}

export default AnswerButton;