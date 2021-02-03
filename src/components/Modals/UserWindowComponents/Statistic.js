import React from 'react'

function Statistic({statName, statValue}) {

	return(
		<React.Fragment>
			<div>
				<p>{statName}: {statValue}</p>
			</div>
		</React.Fragment>
	)
}

export default Statistic;