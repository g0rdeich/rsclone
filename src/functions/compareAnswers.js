function compareAnswers(string1, string2) {
    function toLine(string) {
        return string.trim().toLowerCase().split(' ').join('');
    }
    const answer = toLine(string1);
    const rightAnswer = toLine(string2);

    return answer.includes(rightAnswer) || rightAnswer.includes(answer);
}

export default compareAnswers;