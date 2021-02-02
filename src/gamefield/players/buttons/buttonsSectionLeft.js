import React from 'react';
import Context from '../../../GlobalContext'
import { getRoundRandomTopics } from '../../../topics/topics'
import AnswerButton from "./answerButton";
import SkipQuestionButton from "./skipQuestionButton";
import show from "../../../functions/show";
import hide from "../../../functions/hide";
import changeHostText from "../../../functions/changeHostText";
import addToStats from "../../../functions/addToStats";
import compareAnswers from "../../../functions/compareAnswers";

function ButtonsSectionLeft() {
	const { setTopics } = React.useContext(Context);

	const {btns, setBtns} = React.useContext(Context);

    function CheckGuess() {
        const pointsInfo = document.querySelector('.player-points')
        let points = parseInt(pointsInfo.innerHTML);
        if(points !== 0) {
            points = parseInt(localStorage.getItem('currentPoints'));
        }
        const answer = document.querySelector('.answer-text').value.trim();
        const rightAnswer = localStorage.getItem('currentQuestionRightAnswer');
        const price = parseInt(localStorage.getItem('currentQuestionPrice'), 10);
        const isRight = compareAnswers(answer, rightAnswer);
        if(isRight === true) {
            changeHostText('Абсолютно верно!');
            points += price;
            console.log(`points now: ${points}`);
            addToStats('right');
        } else {
            points -= price;
            console.log(`points now: ${points}`);
            changeHostText(`Минус ${price} баллов!
        Правильный ответ: ${rightAnswer}`);
            addToStats('wrong');
        }
        const table = document.querySelector('.questions-table');
        const questionText = document.querySelector('.question-text');
        show(table);
        questionText.innerHTML = '';
        hide(questionText);
        const textArea = document.querySelector('.answer-text');
        const submitBtn = document.querySelector('.submit-button');
        hide(textArea);
        textArea.value = '';
        hide(submitBtn);
        localStorage.setItem('currentPoints', points.toString());
        pointsInfo.innerHTML = `${points}`;
        setBtns(
            btns.map((btn) => {
                btn.isBlocked = !btn.isBlocked;
                return btn;
            })
        )
    }

	return (
        <div className="buttons-section-left">
            < AnswerButton />
            <textarea className="answer-text hidden"></textarea>
            <button className="button submit-button hidden"
                    onClick={() => CheckGuess()}>
                Подтвердить ответ</button>
            < SkipQuestionButton />
            <button type='button' className="button next-round-button"
                    onClick={() => getRoundRandomTopics().then(res => setTopics(res))}> Сменить тур</button>
        </div>
    )
}

export default ButtonsSectionLeft;