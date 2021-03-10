<script context="module" lang="ts">
	import type { ConsentElement } from './interface/IConsentElement'
	import type { ConsentConfig } from './interface/IConsentConfig'
	import { ConsentBlock } from './controller/ConsentBlock'

	declare let consentLayerConfig: ConsentConfig

	let consentHeadline: string = ''
	let consentBodyText: string = ''
	let consent: [ConsentElement]
	let htmlBlocks: [string] = ['']

	if (typeof consentLayerConfig !== 'undefined') {
		consentHeadline =
			consentLayerConfig.headline !== undefined ? consentLayerConfig.headline : ''
		consentBodyText =
			consentLayerConfig.bodytext !== undefined ? consentLayerConfig.bodytext : ''
		consent = consentLayerConfig.layers
		consent.forEach((consentLayer: ConsentElement) => {
			// console.log(consentLayer.cookieName)
			const layer = new ConsentBlock(
				consentLayer.name,
				consentLayer.text,
				consentLayer.fieldName,
				consentLayer.callbackFunction,
				consentLayer.setAsDefault,
				consentLayer.cookieName,
			)
			htmlBlocks = [...htmlBlocks, layer.render()]
			// console.log(layer.getName())
		})
	} else {
		throw new Error('no config constentLayerConfig found!')
	}
</script>

<h1>{consentHeadline}</h1>
<p>{consentBodyText}</p>
{#each htmlBlocks as htmlBlock, i} {@html htmlBlock} {/each}
