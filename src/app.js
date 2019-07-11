import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Provider from './ctx/context'

// routes
import IndexPage from './pages/portfolio'
import ProjectPage from './pages/project'
import AboutPage from './pages/about'
import ContactPage from './pages/contact'
import NotFoundPage from './pages/404'

class App extends Component {
	render() {
		return (
			<Provider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={IndexPage} />
						<Route path="/about-me" component={AboutPage} />
						<Route path="/contact" component={ContactPage} />
						<Route path="/projects/:slug" component={ProjectPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default App
