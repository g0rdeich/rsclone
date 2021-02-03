import React from 'react';
import Avatar from "../../components/Avatar";
import Context from '../../GlobalContext'

function PlayerIcon() {
	const { isUserLoged, loggedUser } = React.useContext(Context);
	const [userName, setUserName] = React.useState('');

	React.useEffect(() => {
		setUserName(isUserLoged ? loggedUser.login : 'Anonymous');
	}, [isUserLoged])

    return (
        <div className="player-icon">
            <div className="player-points">0</div>
            <div>{userName}</div>
            < Avatar />
        </div>

    )
}

export default PlayerIcon;