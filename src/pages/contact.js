import React, { useState } from 'react'
import Layout from '../components/Layout'

const Contact = () => {
	const [inputs, setInputs] = useState({})

	const handleSubmit = event => {
		event && event.preventDefault()
		sendForm(event)
	}

	const handleInputChange = event => {
		event.persist()

		setInputs(inputs => ({
			...inputs,
			[event.target.name]: event.target.value
		}))
	}

	const sendForm = () => {
		console.log(inputs)
	}
	return (
		<Layout pageTitle="Contact">
			<section className="contact">
				<h2 className="contact__title">Let's Talk</h2>
				<form className="contact__form" onSubmit={handleSubmit}>
					<div className="form-field">
						<input
							className="field"
							type="text"
							name="name"
							value={inputs.name}
							placeholder="Your name"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-field">
						<input
							className="field"
							type="email"
							name="email"
							value={inputs.email}
							placeholder="Your e-mail"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-field">
						<textarea
							className="field textarea"
							name="message"
							value={inputs.message}
							placeholder="What can I help you with?"
							onChange={handleInputChange}
						/>
					</div>
					<input className="submit" type="submit" value="Send" />
				</form>
			</section>
		</Layout>
	)
}

export default Contact
