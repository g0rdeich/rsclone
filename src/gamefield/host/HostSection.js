import React from 'react';
import Avatar from "../../components/Avatar";
import HostAvatar from ".././../img/HostAvatar.jpg";

function HostSection() {
    return (
        <div className="host-section">
            <div className="info hidden">
                <p className="host-text"></p>
            </div>
            < Avatar avatarSrc={HostAvatar}/>
        </div>
    )
}

export default HostSection;