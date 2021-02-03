import React from 'react';
import Avatar from "../../components/Avatar";
import HostAvatar from ".././../img/HostAvatar.jpg";
import Context from "../../GlobalContext";

function HostSection() {
    const {btns} = React.useContext(Context);

    function readQuestion() {
        console.log('reading');
        const currentQuestion = localStorage.getItem('currentQuestionText');
        speechSynthesis.speak(
            new SpeechSynthesisUtterance(currentQuestion)
        );
    }

    return (
        <div className="host-section">
            <div className="host-profile">
                <button className="button button-read-question" disabled={btns[2].isBlocked}
                onClick={() => readQuestion()}>Озвучить вопрос</button>
                < Avatar avatarSrc={HostAvatar}/>
            </div>
            <div className="info hidden">
                <p className="host-text"></p>
            </div>
        </div>
    )
}

export default HostSection;