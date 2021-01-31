import React from 'react';
import HostSection from "./host/HostSection";
import GameSection from "./gamefield/GameSection";
import Topics from "./topics/topics";
import hide from "./functions/hide";
import show from "./functions/show";
import changeHostText from "./functions/changeHostText";


function App() {
    const [topics, setTopics] = React.useState(Topics)
    function logger(a) {
        console.log(a);
        if(a.played === true) {
            console.log('already played');
            return;
        }
        const newHostText = `${a.topicName} ${a.price}`;
        const info = document.querySelector('.info');
        show(info);
        changeHostText(newHostText);
        setTopics(
            topics.map((topic) => {
                a.played = true;
                return topic;
        }))
        const table = document.querySelector('.questions-table');
        hide(table);
        const questionText = document.querySelector('.question-text');
        questionText.innerHTML = a.question;
        show(questionText);
    }
   return (
     <div className="wrapper">
       < HostSection />
       < GameSection topics={topics} logger={logger}/>
     </div>
   );
}

export default App;
