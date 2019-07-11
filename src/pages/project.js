import React, { useState, useEffect } from 'react'
import axios from 'axios'
import slugify from 'slugify'
import * as Vibrant from 'node-vibrant'
import { cors } from '../api/behance'

import Link from '../components/Link'
import Layout from '../components/Layout'
import { behanceSingleProject } from '../api/behance'

import toolsColors from '../data/colors-associations'

const ProjectPage = ({ location, match }) => {
	const [loading, setLoading] = useState(true)
	const [projectColors, setProjectColors] = useState({})
	const [project, setProject] = useState({
		description: '',
		modules: [],
		tools: [],
		fields: [],
		url: ''
	})

	const { id, name, cover } = location.state
	const { description, modules, fields, tools, url } = project

	console.log('COVER: ', cover)

	// const colors =
	// 	color &&
	// 	Object.entries(color[0]).reduce((obj, value) => {
	// 		const key = value[0]
	// 		const val = value[1] > 200 ? value[1] - 100 : value[1]

	// 		obj[key] = val
	// 		return obj
	// 	}, {})
	// const mainColor = color && `rgb(${colors.r}, ${colors.g}, ${colors.b})`

	const mainColor = `rgb(0, 0, 0)`

	const fetchProject = async id => {
		const { data } = await axios.get(behanceSingleProject(id))
		const { description, modules, tools, fields, url } = data.project
		const project = { description, modules, tools, fields, url }

		sessionStorage.setItem(`project-${id}`, JSON.stringify(project))
		setProject(project)
		process.env.NODE_ENV === 'development' && console.log('BEHANCE PROJECT')
	}

	id &&
		useEffect(() => {
			const localProject = sessionStorage.getItem(`project-${id}`)
			process.env.NODE_ENV === 'development' && console.log('LOCAL PROJECT')

			if (localProject) setProject(JSON.parse(localProject))
			else fetchProject(id)

			const colorPalette = new Vibrant(`${cors}${cover}`)
			colorPalette.getPalette().then(palette => {
				const colors = {
					primary: palette.DarkVibrant.getHex(),
					secondary: palette.DarkMuted.getHex()
				}
				setProjectColors(colors)
			})

			setLoading(false)
		}, [])

	console.log('COLORS: ', projectColors)
	return (
		<Layout pageTitle={name}>
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
