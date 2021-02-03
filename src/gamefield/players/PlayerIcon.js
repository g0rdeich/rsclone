import React from 'react';
import Avatar from "../../components/Avatar";
import Context from '../../GlobalContext'
import defaultAvatar from '../../img/default.avatar.png'

function PlayerIcon() {
	const { isUserLoged, loggedUser } = React.useContext(Context);
	const [userName, setUserName] = React.useState('');
	const [imgSrc, setImgSrc] = React.useState();

	React.useEffect(() => {
		setUserName(isUserLoged ? loggedUser.login : 'Anonymous');
		setImgSrc( isUserLoged && loggedUser.avatar !== null ? loggedUser.avatar : defaultAvatar);
	}, [isUserLoged, loggedUser])


	// let {loggedUser, isUserLoged } = React.useContext(Context);


	React.useEffect(() =>{

	}, [loggedUser, isUserLoged])

    return (
        <div className="player-icon">
            <div className="player-points">Очки: 0</div>
            <div>Игрок: {userName}</div>
            < Avatar avatarSrc={imgSrc}/>
        </div>

    )
}

export default PlayerIcon;