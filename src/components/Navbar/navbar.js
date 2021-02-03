import React from 'react'
import Autorization from '../Modals/Autorization'
import UserWindow from '../Modals/UserWindow'
import Context from '../../GlobalContext'

function Navbar() {
	const NAVBAR = 'NAVBAR';
//	const [userLogged, setUserLogged] = React.useState(false)// todo check login state whenpage is loaded
	let { isUserLoged } = React.useContext(Context);

	return(
		<nav>
			<ul className={NAVBAR}>
				{!isUserLoged &&
					(<React.Fragment>
						<Autorization windowName={'Вход'} isRegisterWnindow={false} />
						<Autorization windowName={'Регистрация'} isRegisterWnindow={true}/>
					</React.Fragment>)
				}

				{isUserLoged && (
				<React.Fragment>
					<UserWindow />
				</React.Fragment>
				)}
			</ul>
		</nav>
	)
}

export default Navbar