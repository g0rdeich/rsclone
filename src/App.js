import React from 'react';
import Navbar from "./components/Navbar/navbar";
import GameField from './gamefield/GameField'
import GlobalContext from './GlobalContext'
import  {sessionToken, checkSessionPath} from './components/Const'

async function checLocalToken() {
	const localToken = localStorage.getItem(sessionToken);

	if (localToken){
		const requestOptions = {
			method: 'PUT',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: localToken,
			})
		};

		const request = await fetch(checkSessionPath, requestOptions);
		const result = await request.json();

		if (result.status){
		console.log('token found and valid')
		return result.user;

		} else {
		console.log('token not found or invalid')
		localStorage.removeItem(sessionToken);
		return '';
		}
	}
}

function App() {

	const [loggedUser, setloggedUser] = React.useState('');
	checLocalToken().then (res =>  setloggedUser(res));

	return (
    <GlobalContext.Provider value= {{ loggedUser, setloggedUser}} >
		<div className="wrapper">
      <Navbar />
			<GameField />
    </div>
		</GlobalContext.Provider>
  );
}

export default App;
