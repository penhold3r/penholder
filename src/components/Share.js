import React from 'react'
import { isMobile } from 'react-device-detect'

import colors from '../data/colors-associations'

import Link from '../components/Link'

const Share = ({ url, whatsappText, twitterTxt, twitterHash }) => {
	//console.log('SHARE URL:', url)
	const { social } = colors

	const facebookShare = e => {
		console.log('Facebook')
		e.preventDefault()
		window.open(
			'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
			'facebook-share-dialog',
			'width=626,height=436,top=100,left=100'
		)
	}

	const twitterShare = e => {
		console.log('Twitter')
		e.preventDefault()
		const twUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url)
		window.open(
			`${twUrl}&amp;text=${twitterTxt}&amp;hashtags=${twitterHash}`,
			'twitterwindow',
			'width=626,height=436,top=100,left=100'
		)
	}

	const whatsappLink = isMobile ? (
		<Link
			to={`whatsapp://send?text=${whatsappText} - ${url}`}
			title="Whatsapp"
			className="share-link whatsapp"
			style={{ backgroundColor: social.Whatsapp.color, color: social.Whatsapp.color }}
		>
			<i className="icon icon-whatsapp" />
		</Link>
	) : (
		<Link
			to="https://web.whatsapp.com/send?text=Hola!&phone=tel:+542614548212"
			title="Whatsapp"
			target="_blank"
			className="share-link whatsapp"
			style={{ backgroundColor: social.Whatsapp.color, color: social.Whatsapp.color }}
		>
			<i className="icon icon-whatsapp" />
		</Link>
	)

	return (
		<div className="share-panel">
			<div className="share-panel__inner">
				<button className="share-panel__btn" title="Share">
					<i className="icon icon-share" />
				</button>
				<div className="share-panel__options">
					<Link
						to="#"
						onClick={e => facebookShare(e)}
						className="share-link facebook"
						title="Facebook"
						style={{ backgroundColor: social.Facebook.color, color: social.Facebook.color }}
					>
						<i className="icon icon-facebook" />
					</Link>
					{twitterTxt && (
						<Link
							to="#"
							onClick={e => twitterShare(e)}
							className="share-link twitter"
							title="Twitter"
							style={{ backgroundColor: social.Twitter.color, color: social.Twitter.color }}
						>
							<i className="icon icon-twitter" />
						</Link>
					)}
					{whatsappText && whatsappLink}
				</div>
			</div>
		</div>
	)
}

export default Share
