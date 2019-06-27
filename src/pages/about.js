import React, { useContext } from 'react'
import axios from 'axios'
import slugify from 'slugify'

import { Context } from '../ctx/context'

import Layout from '../components/Layout'
import Link from '../components/Link'

import hero from '../images/penholder-about_illustration.png'
import profileImg from '../images/penholder-about_profile.jpg'

import colors from '../data/colors-associations'

const About = () => {
	const { profile } = useContext(Context)

	const { tools, social } = colors

	let curCol = null
	const skills = tools.reduce((arr, curr) => {
		curr.color !== curCol && arr.push(curr)
		curCol = curr.color

		return arr
	}, [])

	console.log(profile)

	return (
		<Layout pageTitle="About Me">
			<section className="about">
				<header className="about__header">
					<img src={hero && hero} alt="" />
				</header>
				<div className="about__card">
					{Object.keys(profile).length && (
						<>
							<h2 className="about-title">Hello!</h2>
							<p className="about-description">{profile.about}</p>
							<ul className="fields">
								{profile.fields.map((field, key) => (
									<li className="fields__item" key={key}>
										{field}
									</li>
								))}
							</ul>
							<h3 className="about-subtitle">I work with:</h3>
							<ul className="skills-list">
								{skills.map((skill, key) => (
									<li className="skills-list__item" key={key}>
										<i
											className={`icon icon-${slugify(skill.name, { lower: true })}`}
											title={skill.name}
											style={{ color: skill.color }}
										/>
									</li>
								))}
							</ul>
							<h3 className="about-subtitle">Follow me</h3>
							<ul className="social">
								{profile.social_links.map(link => (
									<li className="social__link" key={link.social_id}>
										<Link to={link.url}>
											<i
												className={`icon icon-${slugify(link.service_name, {
													lower: true
												})}`}
												title={link.service_name}
												style={{ color: social[link.service_name].color }}
											/>
										</Link>
									</li>
								))}
							</ul>

							<Link to={profile.url} className="profile-bubble icon icon-behance">
								<img src={profileImg} alt={profile.display_name} />
							</Link>
						</>
					)}
				</div>
			</section>
		</Layout>
	)
}

export default About
