import React, { useState, useEffect } from 'react'
import axios from 'axios'
import slugify from 'slugify'
import * as Vibrant from 'node-vibrant'
import { cors } from '../api/behance'

import { behanceSingleProject } from '../api/behance'
import toolsColors from '../data/colors-associations'

import Link from '../components/Link'
import Layout from '../components/Layout'
import Share from '../components/Share'

const ProjectPage = ({ location }) => {
	const [loading, setLoading] = useState(true)
	const [shareUrl, setShareURL] = useState('')
	const [projectColors, setProjectColors] = useState({})
	const [project, setProject] = useState({
		description: '',
		modules: [],
		tools: [],
		fields: [],
		url: ''
	})

	const { id, name, cover, openGraphImg } = location.state
	const { description, modules, fields, tools, url } = project

	const fetchProject = async id => {
		const { data } = await axios.get(behanceSingleProject(id))
		const { description, modules, tools, fields, url } = data.project
		const project = { description, modules, tools, fields, url }

		sessionStorage.setItem(`project-${id}`, JSON.stringify(project))
		setProject(project)
		process.env.NODE_ENV === 'development' && console.log('BEHANCE PROJECT')
	}

	useEffect(() => {
		if (id) {
			const localProject = sessionStorage.getItem(`project-${id}`)
			process.env.NODE_ENV === 'development' && console.log('LOCAL PROJECT')

			localProject ? setProject(JSON.parse(localProject)) : fetchProject(id)

			const colorPalette = new Vibrant(`${cors}${cover}`)
			colorPalette.getPalette().then(palette => {
				const colors = {
					primary: palette.DarkVibrant.getHex(),
					secondary: palette.DarkMuted.getHex()
				}
				setProjectColors(colors)
			})

			setLoading(false)

			setShareURL(window.location.href)
		}
	}, [])

	return (
		<Layout pageTitle={name} ogImg={openGraphImg}>
			<section className="project">
				<h2
					className="project__title"
					style={{
						borderBottom: `1px solid ${projectColors ? projectColors.primary : '#666'}`
					}}
				>
					{name}
				</h2>
				{loading ? (
					<span>Loading...</span>
				) : (
					<>
						<Share
							url={shareUrl}
							twitterTxt="penHolder Designerd"
							twitterHash="designerd"
							whatsappText="penHolder Designerd"
						/>
						<div className="fields">
							{fields &&
								fields.map((field, key) => (
									<span
										key={key}
										className="fields__tag"
										style={{
											border: `1px solid ${
												projectColors ? projectColors.secondary : '#666'
											}`
										}}
									>
										<small>{field}</small>
									</span>
								))}
						</div>
						<p className="project__description">{description && description}</p>
						<div className="project__content">
							{modules &&
								modules.map(block => {
									let element
									if (block.type === 'image')
										element = <img key={block.id} src={block.sizes.original} alt="" />

									if (block.type === 'text')
										element = <p key={block.id}>{block.text_plain} </p>

									return element
								})}
						</div>
						<div className="project__footer">
							<div className="tools">
								<h4 className="tools__title">Tools:</h4>
								<div className="tools__icons">
									{tools &&
										tools.map(toolItem => {
											const tool = toolsColors.tools.find(
												t => t.name.toLowerCase() === toolItem.title.toLowerCase()
											)

											const toolColor = tool ? tool.color : '#333'

											process.env.NODE_ENV === 'development' &&
												console.log(toolItem.title, toolColor)
											return (
												<span key={toolItem.id} className="tool">
													<i
														className={`tool__icon icon-${slugify(toolItem.title, {
															lower: true,
															remove: /[*+~.()'"!:@]/g
														})}`}
														title={toolItem.title}
														style={{ color: toolColor }}
													/>
													<small>{toolItem.title}</small>
												</span>
											)
										})}
								</div>
							</div>
							<div className="behance-link">
								<Link to={url}>
									<i className={`icon icon-behance`} title="See project on Behance" />
								</Link>
							</div>
						</div>
					</>
				)}
			</section>
		</Layout>
	)
}

export default ProjectPage
