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

const Layout = ({ pageTitle, ogImg, children, overflow }) => {
	const title = 'penHolder Designerd'
	const siteTitle = pageTitle ? `${pageTitle} - ${title}` : title
	return (
		<>
			<Helmet
				htmlAttributes={{ lang: 'en' }}
				title={siteTitle}
				meta={[
					{
						property: 'og:image',
						content: ogImg
					},
					{
						name: 'twitter:image',
						content: ogImg
					},
					{
						name: 'description',
						content: 'Graphic Design and Stuffs'
					},
					{
						property: 'og:description',
						content: 'Graphic Design and Stuffs'
					},
					{
						name: 'twitter:description',
						content: 'Graphic Design and Stuffs'
					},
					{
						property: 'og:title',
						content: siteTitle
					},
					{
						name: 'twitter:title',
						content: siteTitle
					},
					{
						property: 'og:url',
						content: 'https://penholder.net/'
					},
					{
						name: 'twitter:site',
						content: 'https://penholder.net/'
					},
					{
						property: 'og:type',
						content: 'Website'
					},
					{
						name: 'twitter:card',
						content: 'summary_large_image'
					},
					{
						name: 'keywords',
						content:
							'diseno, disenador, diseño, diseñador, grafico, gráfico, web, desarrollo, desarrollador, portfolio'
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
	ogImg: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default Layout
