function addToStats(answer) {
    if(answer === 'right') {
        if(localStorage.getItem('rightAnswers')) {
            const rightAnswers = parseInt(localStorage.getItem('rightAnswers'));
            const newCounter = rightAnswers + 1;
            localStorage.setItem('rightAnswers', newCounter.toString());
        } else {
            localStorage.setItem('rightAnswers', '1');
        }
    } else if (answer === 'wrong') {
        if(localStorage.getItem('wrongAnswers')) {
            const rightAnswers = parseInt(localStorage.getItem('rightAnswers'));
            const newCounter = rightAnswers + 1;
            localStorage.setItem('wrongAnswers', newCounter.toString());
        } else {
            localStorage.setItem('wrongAnswers', '1');
        }
    }
}

export default addToStats;