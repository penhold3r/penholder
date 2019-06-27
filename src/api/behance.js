//const key = process.env.API_KEY
const key = 'Mylbyvky3p0nNTzbpWbLbbBruX5wiNjt'
const cors = 'https://cors-anywhere.herokuapp.com/'

export const behanceProfile = name =>
	`${cors}https://api.behance.net/v2/users/${name}?api_key=${key}`

export const behanceProjects = name =>
	`${cors}https://api.behance.net/v2/users/${name}/projects?api_key=${key}`

export const behanceSingleProject = id =>
	`${cors}https://api.behance.net/v2/projects/${id}?api_key=${key}`
