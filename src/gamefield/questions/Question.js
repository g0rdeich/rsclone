import React from 'react';
import Context from '../../GlobalContext'

function Question({question}) {
	const { handler } = React.useContext(Context)
	let price = question.price;
    if(question.played === true) {
        price = '';
    }
    return (
        <div className="question" onClick={() => handler(question)}>{price}</div>
    )
}

export default Question;