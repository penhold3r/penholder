import React from 'react'

const Footer = () => {
	return (
		<footer className="site-footer">
			<p className="site-footer__copy">
				<small>penHolder © {new Date().getFullYear()}</small>
			</p>
		</footer>
	)
}

export default Footer
