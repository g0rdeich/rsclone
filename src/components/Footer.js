import React from "react";
import gitLogo from '../img/github.png'
import RSlogo from '../img/rs_school_js.svg'

function Footer() {
	return(
		<React.Fragment>
			<footer>
					<a href='https://github.com/g0rdeich'><div className='footerElement'> <img className='gitLogo' src={gitLogo} alt='gitLogo'></img> Alex Gordeev</div></a>
					<a href='https://github.com/thrvrce'><div className='footerElement'> <img className='gitLogo' src={gitLogo} alt='gitLogo'></img> Victor Avdeev</div></a>
					<a href='https://rs.school/js/'><div className='footerElement'> <img className='gitLogo' src={RSlogo} alt='RSlogo'></img> RS School</div></a>
					<div className='footerElement'> 2021 год</div>
			</footer>
		</React.Fragment>
	)
}

export default Footer;