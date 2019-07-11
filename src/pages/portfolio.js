import React, { useContext } from 'react'
import { Context } from '../ctx/context'

import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'

const IndexPage = () => {
	const { projects } = useContext(Context)

	return (
		<Layout overflow={true}>
			<section className="portfolio">
				<h2 className="portfolio__title">My Work</h2>
				<ul className="portfolio__grid">
					{projects &&
						projects
							.filter(project => project.name)
							.map(link => <ProjectCard key={link.id} project={link} />)}
				</ul>
			</section>
		</Layout>
	)
}

export default IndexPage
