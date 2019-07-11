import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from './Header'
import Footer from './Footer'

import 'sanitize.css'
import '../styles/icons.scss'
import '../styles/index.scss'

import ICO from '../images/favicon.ico'
import PNG from '../images/favicon.png'

const Layout = ({ pageTitle, children, overflow }) => {
	const title = 'penHolder Designerd'
	const siteTitle = pageTitle ? `${pageTitle} - ${title}` : title
	return (
		<>
			<Helmet
				htmlAttributes={{ lang: 'en' }}
				title={siteTitle}
				meta={[
					{
						name: 'description',
						content: 'description'
					},
					{
						name: 'author',
						content: title
					},
					{
						name: 'theme-color',
						content: '#FF9900'
					}
				]}
				link={[
					{
						href: ICO,
						rel: 'shortcut icon',
						type: 'image/x-icon'
					},
					{
						href: PNG,
						rel: 'icon',
						type: 'image/png',
						sizes: '32x32 192x192'
					},
					{
						href: 'https://fonts.googleapis.com/css?family=Maven+Pro:400,900&display=swap',
						rel: 'stylesheet'
					}
				]}
			/>

			<Header siteTitle={title} />
			<div className={overflow ? 'main-content overflow' : 'main-content'}>{children}</div>
			<Footer />
		</>
	)
}

Layout.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default Layout
