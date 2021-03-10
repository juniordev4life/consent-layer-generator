import type { ConsentElement } from './IConsentElement'

export interface ConsentConfig {
	headline: string
	bodytext: string
	matomo: boolean
	layers: [ConsentElement]
}
