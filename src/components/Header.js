import PropTypes from 'prop-types'
import React from 'react'

import Link from './Link'
import logo from '../images/penholder-logo.svg'

const Header = ({ siteTitle }) => {
	return (
		<header className="site-header">
			<div className="inner-header">
				<h1 className="logo">
					<Link to="/">
						<img src={logo} alt={siteTitle} />
					</Link>
				</h1>

				<nav className="main-nav">
					<ul className="main-nav__list">
						<li className="list-item">
							<Link to="/">My Work</Link>
						</li>
						<li className="list-item">
							<Link to="/about-me">About Me</Link>
						</li>
						<li className="list-item">
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string
}

Header.defaultProps = {
	siteTitle: ``
}

export default Header
