import React from 'react'
import  {sessionToken, updateUserPath, logOutPath} from '../../Const'
import { updateUserOnServer } from '../../../functions/ServerFunctions'
import Context from '../../../GlobalContext'
import defaultAvatar from '../../../img/default.avatar.png'
import { logOut} from '../../../functions/ServerFunctions'

function UserInfo() {
	let {loggedUser ,setisUserLoged, setloggedUser } = React.useContext(Context);
	const [imgSrc, setImgSrc] = React.useState(loggedUser.avatar || defaultAvatar);

	async function setAvatarhandler(e) {
		const file = document.getElementById('setavatar').files[0];
		console.log(document.getElementById('setavatar').files);
		const LIMIT_AVATAR_SIZE = 0.04;
		if (file) {
			if ( (file.size / 1024 /1024) > LIMIT_AVATAR_SIZE) {
				alert(`Объем файла превышает ${LIMIT_AVATAR_SIZE} мб, выберите подходящий файл`);
				return;
			}

			const reader = new FileReader();

			reader.onload = async () => {
				const {statuts, user, statusCode, message} = await updateUserOnServer('avatar', reader.result, sessionToken, updateUserPath);

				if (statusCode === 200) {
					setloggedUser(user)
					setImgSrc(reader.result);
				} else if(statusCode === 500){
					alert(message);
				} else {
					alert(`${message} Будет выполнен выход из профиля`);
					logOut(sessionToken, loggedUser, logOutPath, setisUserLoged, setloggedUser)

				}
			}
			reader.readAsDataURL(file);
		}
	}

	return(
		<React.Fragment>
			<div className='user-info-avatar'>
				<img src={imgSrc} alt='NotLoaded' className='avatarImg'></img>
				<label >Выбор аватара:
					<input name='avatarFile' id='setavatar' type='file' accept='image/png' placeholder='' title='Выберите картинку .PNG размером до 40кб в качестве аватара' onChange = { (e) => setAvatarhandler(e)}/>
				</label>
			</div>
		</React.Fragment>
	)
}

export default UserInfo;