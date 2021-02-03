function roundSkipped() {
    if(localStorage.getItem('skippedRoundsCounter')) {
        const counter = parseInt(localStorage.getItem('skippedRoundsCounter'));
        localStorage.setItem('skippedRoundsCounter', `${counter + 1}`);
    } else {
        localStorage.setItem('skippedRoundsCounter', '1');
    }
}

export default roundSkipped;