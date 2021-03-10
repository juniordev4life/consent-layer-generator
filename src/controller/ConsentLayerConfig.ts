import type { ConsentElement } from '../interface/IConsentElement'

class ConsentLayerConfig {
	headline: string
	bodytext: string
	matomo: boolean
	layers: [ConsentElement]

	constructor(headline: string, bodytext: string, matomo: boolean, layers: [ConsentElement]) {
		this.headline = headline
		this.bodytext = bodytext
		this.matomo = matomo
		this.layers = layers
	}
}

export { ConsentLayerConfig }
