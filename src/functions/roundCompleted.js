function roundCompleted() {
    if(localStorage.getItem('completedRoundsCounter')) {
        const counter = parseInt(localStorage.getItem('completedRoundsCounter'));
        localStorage.setItem('completedRoundsCounter', `${counter + 1}`);
    } else {
        localStorage.setItem('completedRoundsCounter', '1');
    }
}

export default roundCompleted;