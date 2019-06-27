import React, { useState, useEffect } from 'react'
import axios from 'axios'
import slugify from 'slugify'

import Link from '../components/Link'
import Layout from '../components/Layout'
import { behanceSingleProject } from '../api/behance'

import toolsColors from '../data/colors-associations'

const ProjectPage = ({ location, match }) => {
	const [loading, setLoading] = useState(true)
	const [project, setProject] = useState({
		description: '',
		modules: [],
		tools: [],
		fields: [],
		url: ''
	})

	const { id, name, color } = location.state
	const { description, modules, fields, tools, url } = project

	const colors =
		color &&
		Object.entries(color[0]).reduce((obj, value) => {
			const key = value[0]
			const val = value[1] > 200 ? value[1] - 100 : value[1]

			obj[key] = val
			return obj
		}, {})
	const mainColor = color && `rgb(${colors.r}, ${colors.g}, ${colors.b})`

	const fetchProject = async () => {
		const { data } = await axios.get(behanceSingleProject(id))
		const { description, modules, tools, fields, url } = data.project
		const project = { description, modules, tools, fields, url }

		localStorage.setItem(`project-${id}`, JSON.stringify(project))
		setProject(project)
		console.log('PROJECT: ', project)
	}

	id &&
		useEffect(() => {
			const localProject = localStorage.getItem(`project-${id}`)
			console.log('LOCAL PROJECT: ', localProject)

			if (localProject) setProject(JSON.parse(localProject))
			else fetchProject()
			setLoading(false)
		}, [])

	return (
		<Layout pageTitle={name}>
			<section className="project">
				<h2 className="project__title" style={{ borderBottom: `1px solid ${mainColor}` }}>
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
										style={{ border: `1px solid ${mainColor}` }}
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
										tools.map(tool => {
											const toolColor = toolsColors.tools.find(
												t => t.name.toLowerCase() === tool.title.toLowerCase()
											).color

											console.log(tool.title, toolColor)
											return (
												<span key={tool.id} className="tool">
													<i
														className={`tool__icon icon-${slugify(tool.title, {
															lower: true
														})}`}
														title={tool.title}
														style={{ color: toolColor }}
													/>
													<small>{tool.title}</small>
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
