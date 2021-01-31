import React from 'react';

function Question({question, logger}) {
    let price = question.price;
    if(question.played === true) {
        price = '';
    }
    return (
        <div className="question" onClick={() => logger(question)}>{price}</div>
    )
}

export default Question;