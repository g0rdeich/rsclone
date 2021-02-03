import React from 'react';
import HostSection from "../host/HostSection";
import PlayersSection from "../players/PlayersSection";

function BottomSection() {
    return(
        <div className="bottom-section">
            < HostSection />
            < PlayersSection />
        </div>
    )
}

export default BottomSection;