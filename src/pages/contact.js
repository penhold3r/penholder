import React, { useState } from 'react'
import Layout from '../components/Layout'

import submitForm from '../utils/submit-form'

const Contact = () => {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		message: ''
	})

	const contactMsgs = () => ({
		successMsg: 'Message sent!',
		errorMsg: 'Something went wrong, try again later.',
		sending: 'Sending...'
	})

	const handleSubmit = event => {
		event && event.preventDefault()

		console.log(inputs)

		submitForm(event.target, {
			dest: '/',
			fields: '.field',
			successMsg: contactMsgs().successMsg,
			errorMsg: contactMsgs().errorMsg,
			sending: contactMsgs().sending,
			urlencoded: true
		})

		setInputs({
			name: '',
			email: '',
			message: ''
		})
	}

	const handleInputChange = event => {
		event.persist()

		setInputs(inputs => ({
			...inputs,
			[event.target.name]: event.target.value
		}))
	}

	return (
		<Layout pageTitle="Contact">
			<section className="contact">
				<h2 className="contact__title">Let's Talk</h2>
				<form
					name="contact"
					method="POST"
					data-netlify="true"
					className="contact__form"
					onSubmit={handleSubmit}
				>
					<input type="hidden" name="form-name" value="contact" />
					<div className="form-field">
						<input
							className="field"
							type="text"
							name="name"
							value={inputs.name}
							placeholder="Your name"
							onChange={e => handleInputChange(e)}
							required
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
							required
						/>
					</div>
					<div className="form-field">
						<textarea
							className="field textarea"
							name="message"
							value={inputs.message}
							placeholder="What can I help you with?"
							onChange={handleInputChange}
							required
						/>
					</div>
					<input className="submit" type="submit" value="Send" />
				</form>
			</section>
		</Layout>
	)
}

export default Contact
