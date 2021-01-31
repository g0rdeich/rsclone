import React from 'react'
import HostSection from "./host/HostSection";
import GameSection from "./GameSection/GameSection";

export default function GameField({topics, logger}) {
	const GAME_FIELD_WRAPPER = 'GAME_FIELD_WRAPPER';
	return(
		<div className={GAME_FIELD_WRAPPER}>
			< HostSection />
      		< GameSection topics={topics} logger={logger}/>
		</div>
	)
}