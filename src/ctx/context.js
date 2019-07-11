import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { behanceProfile, behanceProjects } from '../api/behance'

export const Context = createContext()

const Provider = ({ children }) => {
	const [profile, setProfile] = useState({})
	const [projects, setProjects] = useState([])

	const getProjects = async () => {
		const localProjects = sessionStorage.getItem('localProjects')

		if (localProjects) {
			setProjects(JSON.parse(localProjects))
		} else {
			try {
				const resp = await axios.get(behanceProjects('penhold3r'))
				const { projects } = await resp.data

				sessionStorage.setItem('localProjects', JSON.stringify(projects))
				setProjects(projects)
			} catch (error) {
				console.error(error)
			}
		}
	}

	const getProfile = async () => {
		const localProfile = sessionStorage.getItem('profile')

		if (localProfile) {
			setProfile(JSON.parse(localProfile))
		} else {
			try {
				const resp = await axios.get(behanceProfile('penhold3r'))
				const { id, display_name, url, sections, social_links, fields } = await resp.data.user
				const profile = {
					id,
					display_name,
					url,
					about: sections['Who I am'],
					social_links,
					fields
				}
				sessionStorage.setItem('profile', JSON.stringify(profile))
				setProfile(profile)
			} catch (error) {
				console.error(error)
			}
		}
	}

	useEffect(() => {
		getProjects()
		getProfile()
	}, [])

	return <Context.Provider value={{ profile, projects }}>{children}</Context.Provider>
}

export default Provider
