import {
	getAllTopicsPath,
	getTopicByNamePath,
	insertArrayOfTopicsPath,
	deleteTopicByNamePath,
} from '../components/Const';

async function getAllTopics() {
	// возвращает массив объектов -тем
	try {
		const request = await fetch(getAllTopicsPath);
		if (!request.ok) {
			throw new Error(`Запрос всех тем завершился с кодом ${request.status}`)
		}

		const response = await request.json();

		return response;

	} catch (err) {
		alert(err.message);
	}
}

async function getTopicByName(topicName) {
	try {
		const request = await fetch(`${getTopicByNamePath}/${topicName}`);

		if (!request.ok) {
			throw new Error(`Запрос темы c фильтром по наименованию завершился с кодом ${request.status}`)
		}

		const response = await request.json();

		return response;

	} catch (err) {
		alert(err.message);
	}
}

async function insertArrayOfTopics(arrayOfTopics) {
	/*
	принимает массив объектов, например массив с одним объектом:
		[
			{
				topicName: string;
				topicQuestions: [
					{
						price: number,
						question: string,
						answers: string,
					},
				],
			}
		]
	*/
	try{
		const requestOptions = {
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(arrayOfTopics)
		}
		const request = await fetch(insertArrayOfTopicsPath,requestOptions)

		if (!request.status) {
			throw new Error(`Запрос на вставку массива тем завершился с кодом ${request.status}`)
		}

		const { insertedTopics, rejectedTopics } = await request.json();

		return { insertedTopics, rejectedTopics };
	} catch (err) {
	alert(err.message);
	}
}

async function deleteTopicByName(topicName) {
	try {
		const request = await fetch(`${deleteTopicByNamePath}/${topicName}`, {method: 'DELETE'});

		if (!request.ok) {
			throw new Error(`Удаление темы c фильтром по наименованию завершился с кодом ${request.status}`)
		}

		const response = await request.json();
		// возвращает 1 если что-то было удалено.
		return response;

	} catch (err) {
		alert(err.message);
	}
}

const usedTopics = [];
async function getRoundRandomTopics() {
	const listOfTopics = await getAllTopics();
	const numberOfTopics = listOfTopics.length;
	const NUMBER_OF_TOPICS_IN_ROUND = 6;

	function getRandomIndexNotInArr(arr) {
		// возвращает псевдослучайный индекс не существующий в массиве из параметра (чаще всего массив индексов для использования в результирующем массиве тем)
		const randomIndex = Math.floor(Math.random() * Math.floor(numberOfTopics));
		// console.log(arr, randomIndex);
		return arr.find( (usedIndex) => usedIndex === randomIndex) ? getRandomIndexNotInArr(arr) : randomIndex;
	}

	function fillTopicsToUse(extArr) {
		const resultArr = extArr;
		const randomIndex = getRandomIndexNotInArr(resultArr);
		const currentTopicName = listOfTopics[randomIndex].topicName;

		// console.log(resultArr, randomIndex,usedTopics.length, usedTopics, currentTopicName);
		if ( !(usedTopics.find((usedTopicName) => currentTopicName === usedTopicName)) || (usedTopics.length + 1) >= numberOfTopics) {
			// если в списке использованных тем не найдена текущая или список использованных тем переполнен, то используем текущую
			resultArr.push(randomIndex);
			if (!(usedTopics.length + 1) >= numberOfTopics) {
				usedTopics.push(currentTopicName);
			}
		} else {
			console.log(`${usedTopics.length} ${ !(usedTopics.find((usedTopicName) => currentTopicName === usedTopicName))} ${(usedTopics.length + 1) >= numberOfTopics}`)
			// resultArr.push(randomIndex);
		}

		return resultArr.length < NUMBER_OF_TOPICS_IN_ROUND ? fillTopicsToUse(resultArr) : resultArr;
	}

	const topicsToUse = fillTopicsToUse([]);

	const result = topicsToUse.map((indexOfTopic) => {
		const topicToUse = listOfTopics[indexOfTopic];
		return {
		topicName: topicToUse.topicName,
		topicQuestions: [...topicToUse.topicQuestions]
		}
	});

	return result;
}


 // getRoundRandomTopics().then(result => {console.log(result); console.log(`usedTopics: ${usedTopics}`);});

 // setTimeout(() => getRoundRandomTopics().then(result => {console.log(result); console.log(`usedTopics: ${usedTopics}`);}), 3000);
const Topics = [
    {
        topicName: 'topic 1',
        topicQuestions: [
            {
                price: 100,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 200,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 300,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 400,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 500,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
        ]
    },
    {
        topicName: 'topic 2',
        topicQuestions: [
            {
                price: 100,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 200,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 300,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 400,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 500,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
        ]
    },
    {
        topicName: 'topic 3',
        topicQuestions: [
            {
                price: 100,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 200,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 300,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 400,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 500,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
        ]
    },
    {
        topicName: 'topic 4',
        topicQuestions: [
            {
                price: 100,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 200,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 300,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 400,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 500,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
        ]
    },
    {
        topicName: 'topic 5',
        topicQuestions: [
            {
                price: 100,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 200,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 300,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 400,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 500,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
        ]
    },
    {
        topicName: 'topic 6',
        topicQuestions: [
            {
                price: 100,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 200,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 300,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 400,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
            {
                price: 500,
                question: 'abc',
                answers: 'cba',
                played: false,
            },
        ]
    },
]


export default Topics;
export {
	getAllTopics,
	getTopicByName,
	insertArrayOfTopics,
	deleteTopicByName,
	getRoundRandomTopics,
}
