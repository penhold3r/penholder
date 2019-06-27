import React, { useContext } from 'react'

import { Context } from '../ctx/context'

import Layout from '../components/Layout'
import Link from '../components/Link'

const IndexPage = () => {
	const nodes = false

	const { projects, dispatch } = useContext(Context)

	console.log(projects)

	return (
		<Layout>
			<section className="portfolio">
				<h2 className="portfolio__title">My Work</h2>
				<ul className="portfolio__grid">
					{projects &&
						projects
							.filter(project => project.name)
							.map(link => {
								const { colors, covers, id, name, slug } = link
								const { r, g, b } = colors[0]
								const mainColor = `rgb(${r}, ${g}, ${b})`

								return (
									<li key={id} className="project-card">
										<Link
											className="project-card__link"
											to={{
												pathname: `/projects/${id}/${slug.toLowerCase()}`,
												state: {
													id,
													name,
													color: colors
												}
											}}
										>
											<div
												className="project-card__image--wrapper"
												style={{ backgroundColor: mainColor }}
											>
												<div
													className="image-placeholder"
													style={{ backgroundImage: `url(${covers['115']})` }}
												/>
												<img
													className="project-card__image"
													src={covers['404']}
													alt={`[ ${name} ]`}
												/>
											</div>
											<h3 className="project-card__title">{name}</h3>
										</Link>
									</li>
								)
							})}
				</ul>
			</section>
		</Layout>
	)
}

export default IndexPage
