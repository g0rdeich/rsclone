import React from 'react';
import Topic from "./Topic";

function QuestionsSection() {
    return (
        <div className="questions-section">
            <div className="questions-table">
                <div className="round-number">Тур 1</div>
                < Topic />
                < Topic />
                < Topic />
                < Topic />
                < Topic />
                < Topic />
            </div>
        </div>
    )
}

export default QuestionsSection;