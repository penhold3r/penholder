import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { behanceProfile, behanceProjects } from '../api/behance'

export const Context = createContext()

const Provider = ({ children }) => {
	const [profile, setProfile] = useState({})
	const [projects, setProjects] = useState([])

	const getProjects = () => {
		const localProjects = sessionStorage.getItem('localProjects')

		localProjects
			? setProjects(JSON.parse(localProjects))
			: axios.get(behanceProjects('penhold3r')).then(({ data }) => {
					const { projects } = data
					sessionStorage.setItem('localProjects', JSON.stringify(projects))
					setProjects(projects)
			  })
	}

	const getProfile = () => {
		const localProfile = sessionStorage.getItem('profile')

		localProfile
			? setProfile(JSON.parse(localProfile))
			: axios.get(behanceProfile('penhold3r')).then(({ data }) => {
					const { id, display_name, url, sections, social_links, fields } = data.user
					const profile = {
						id,
						display_name,
						url,
						about: sections['Who I am'],
						social_links,
						fields
					}
					//console.log('PROFILE: ', profile)
					sessionStorage.setItem('profile', JSON.stringify(profile))
					setProfile(profile)
			  })
	}

	useEffect(() => {
		getProjects()
		getProfile()
	}, [])

	return <Context.Provider value={{ profile, projects }}>{children}</Context.Provider>
}

export default Provider
