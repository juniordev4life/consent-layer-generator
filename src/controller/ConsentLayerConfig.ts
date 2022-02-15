import type { ConsentElement } from '../interface/IConsentElement'

class ConsentLayerConfig {
	matomo: boolean
	banner: {
		text: string
	}
	modal: {
		headline: string
		bodyText: string
		layers: [ConsentElement]
	}

	constructor(
		bannerText: string,
		headline: string,
		bodyText: string,
		matomo: boolean,
		layers: [ConsentElement],
	) {
		this.banner.text = bannerText
		this.modal.headline = headline
		this.modal.bodyText = bodyText
		this.matomo = matomo
		this.modal.layers = layers
	}
}

export { ConsentLayerConfig }
