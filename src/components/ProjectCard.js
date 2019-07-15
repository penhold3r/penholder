import React from 'react'

import Link from '../components/Link'

const ProjectCard = ({ project: { covers, id, name, slug } }) => {
	return (
		<li key={id} className="project-card">
			<Link
				className="project-card__link"
				to={{
					pathname: `/projects/${slug.toLowerCase()}`,
					state: {
						id,
						name,
						cover: covers['115'],
						openGraphImg: covers.original
					}
				}}
			>
				<div className="project-card__image--wrapper">
					<div
						className="image-placeholder"
						style={{ backgroundImage: `url(${covers['115']})` }}
					/>
					<img className="project-card__image" src={covers['404']} alt={`[ ${name} ]`} />
				</div>
				<h3 className="project-card__title">{name}</h3>
			</Link>
		</li>
	)
}

export default ProjectCard
