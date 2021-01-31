import React from 'react';
import AnswerButton from "./answerButton";
import SkipQuestionButton from "./skipQuestionButton";
import show from "../../../functions/show";
import hide from "../../../functions/hide";
import changeHostText from "../../../functions/changeHostText";

function checkGuess() {
    const answer = document.querySelector('.answer-text').value;
    const rightAnswer = localStorage.getItem('currentQuestionRightAnswer');
    const price = parseInt(localStorage.getItem('currentQuestionPrice'), 10);
    if(answer === rightAnswer) {
        changeHostText('Абсолютно верно!');
        console.log(price);
    } else {
        console.log(-price);
        changeHostText(`Минус ${price} баллов!`);
    }
    const table = document.querySelector('.questions-table');
    const questionText = document.querySelector('.question-text');
    show(table);
    questionText.innerHTML = '';
    hide(questionText);
}

function ButtonsSection() {
    return (
        <div className="buttons-section">
            < AnswerButton />
            <textarea className="answer-text hidden"></textarea>
            <button className="button submit-button hidden"
                    onClick={() => checkGuess()}>
                Подтвердить ответ</button>
            < SkipQuestionButton/>
        </div>
    )
}

export default ButtonsSection;