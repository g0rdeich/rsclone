import React from'react';
import hide from "../../../functions/hide";
import show from "../../../functions/show";
import Context from "../../../GlobalContext";


function SkipQuestionButton() {
    const {btns, setBtns} = React.useContext(Context);

    function skipQuestion() {
        const table = document.querySelector('.questions-table');
        const questionText = document.querySelector('.question-text');
				const info = document.querySelector('.info');
				const textArea = document.querySelector('.answer-text');
    		const submitBtn = document.querySelector('.submit-button');
    		hide(textArea);
    		hide(submitBtn);
        hide(info);
        hide(questionText);
        show(table);
        setBtns(
            btns.map((btn) => {
                btn.isBlocked = !btn.isBlocked;
                return btn;
            })
        )
    }

    return (<button className="button skip-button" disabled={btns[0].isBlocked}
                    onClick={() => skipQuestion()}>
        Пропустить вопрос</button>);
}

export default SkipQuestionButton;