import React from 'react'
import HostSection from "./host/HostSection";
import GameSection from "./GameSection/GameSection";
import BottomSection from "./bottomSection/BottomSection";

export default function GameField() {
	const GAME_FIELD_WRAPPER = 'GAME_FIELD_WRAPPER';
	return(
		<div className={GAME_FIELD_WRAPPER}>
      		< GameSection />
      		< BottomSection />
		</div>
	)
}