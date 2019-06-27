import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

const Link = ({ children, to, ...other }) => {
	const internal = /^\/(?!\/)/.test(to) || typeof to === 'object'

	return internal ? (
		<ReactLink to={to} {...other}>
			{children}
		</ReactLink>
	) : (
		<a href={to} {...other} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	)
}

export default Link
