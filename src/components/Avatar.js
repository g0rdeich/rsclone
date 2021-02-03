import React from 'react';

function Avatar({avatarSrc}) {
    return (
        <div className="avatar"><img src={avatarSrc} alt='NotLoaded' className='avatarImg'></img></div>
    )
}

export default Avatar;