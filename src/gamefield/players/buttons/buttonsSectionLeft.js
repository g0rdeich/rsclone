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
import useSound from "use-sound";
import wrongAnswerSound from "../../../sounds/100-k-1-wrong-answer.mp3";
import rightAnswerSound from "../../../sounds/right-answer.mp3";
import getRandomInt from "../../../functions/getRandomNumber";
import RightAnswerPhrases from "../../host/rightAnswerPhrases";
import WrongAnswerPhrases from "../../host/wrongAnswersPhrases";
import roundCompleted from "../../../functions/roundCompleted";
import roundSkipped from "../../../functions/roundSkipped";


function ButtonsSectionLeft() {
	const { topics, setTopics } = React.useContext(Context);

	const {btns, setBtns} = React.useContext(Context);

	const { loggedUser, setloggedUser, isUserLoged, setisUserLoged } = React.useContext(Context);
  const { setTour } = React.useContext(Context);

    const [playWrongAnswerSound] = useSound(wrongAnswerSound);
    const [playRightAnswerSound] = useSound(rightAnswerSound);

    const table = document.querySelector('.questions-table');
    const questionText = document.querySelector('.question-text');
    const info = document.querySelector('.info');


    function CheckGuess() {
        const pointsInfo = document.querySelector('.player-points')
        let points = parseInt(pointsInfo.innerHTML.slice(6));
        if(points !== 0) {
            points = parseInt(localStorage.getItem('currentPoints'));
        }
        const answer = document.querySelector('.answer-text').value.trim();
        const rightAnswer = localStorage.getItem('currentQuestionRightAnswer');
        const price = parseInt(localStorage.getItem('currentQuestionPrice'), 10);
        const isRight = compareAnswers(answer, rightAnswer);
        const randomNumber = getRandomInt(0, RightAnswerPhrases.length);
        if(isRight === true && answer !== '') {
            changeHostText(RightAnswerPhrases[randomNumber]);
            points += price;
            (isUserLoged && addToStats(true, loggedUser, setloggedUser, setisUserLoged));
            playRightAnswerSound();
        } else {
            points -= price;
            changeHostText(`${WrongAnswerPhrases[randomNumber]}
            Минус ${price} баллов!
        Правильный ответ: ${rightAnswer}`);
        (isUserLoged && addToStats(false, loggedUser, setloggedUser, setisUserLoged));
            playWrongAnswerSound();
        }
        show(table);
        questionText.innerHTML = '';
        hide(questionText);
        const textArea = document.querySelector('.answer-text');
        const submitBtn = document.querySelector('.submit-button');
        hide(textArea);
        textArea.value = '';
        hide(submitBtn);
        localStorage.setItem('currentPoints', points.toString());
        pointsInfo.innerHTML = `Очки: ${points}`;
        setBtns(
            btns.map((btn) => {
                btn.isBlocked = !btn.isBlocked;
                return btn;
            })
        )
    }

    function updateTopics() {
        const matrix = topics.map((topic) => topic.topicQuestions
            .map((question) => question.played));
        const areAllPlayedArr = matrix.reduce((total, value) => total.concat(value));
        const areAllPlayed =  areAllPlayedArr.every((item) => item === true);
        if(areAllPlayed === true) {
            roundCompleted();
        } else {
            roundSkipped();
        }
        getRoundRandomTopics().then(res => setTopics(res));
        hide(questionText);
        show(table);
        hide(info);
        setTour(
            (tour) => {
                return tour + 1;
            }
        )
        setBtns(
            btns.map((btn) => {
                btn.isBlocked = true; // !btn.isBlocked;
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
                    onClick={() => updateTopics()}> Сменить тур</button>
        </div>
    )
}

export default ButtonsSectionLeft;