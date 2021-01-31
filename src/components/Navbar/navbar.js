import React from 'react'
import PropTypes from 'prop-types'
import Autorization from '../Modals/Autorization'
import UserWindow from '../Modals/UserWindow'
import Context from '../../GlobalContext'

function Navbar() {
	const NAVBAR = 'NAVBAR';
//	const [userLogged, setUserLogged] = React.useState(false)// todo check login state whenpage is loaded
	const {loggedUser} = React.useContext(Context);

	return(
		<nav>
			<ul className={NAVBAR}>
				{!loggedUser &&
					(<React.Fragment>
						<Autorization windowName={'Вход'} isRegisterWnindow={false} />
						<Autorization windowName={'Регистрация'} isRegisterWnindow={true}/>
					</React.Fragment>)
				}

				{loggedUser && (
				<React.Fragment>
					<UserWindow />
				</React.Fragment>
				)}
			</ul>
		</nav>
	)
}

export default Navbar