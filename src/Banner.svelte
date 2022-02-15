<script lang="ts">
	import { onMount } from 'svelte'
	import matomoState from './store/matomo'
	import Cookies from 'js-cookie'
	import snarkdown from 'snarkdown'
	import { slide } from 'svelte/transition'

	let language: string
	let matomoBlock: boolean = false
	let consentBannerText: string = ''
	let hasTrackingCookie: boolean = Cookies.get('dbc-consent') !== undefined

	onMount(() => {
		if (typeof window['consentLayerConfig'] !== 'undefined') {
			language = window['consentLayerConfig']?.language
				? window['consentLayerConfig'].language
				: 'DE-de'
			matomoBlock = window['consentLayerConfig']?.matomo
				? window['consentLayerConfig'].matomo
				: false
			consentBannerText =
				window['consentLayerConfig']?.banner?.text !== undefined
					? window['consentLayerConfig'].banner.text
					: ''
		} else {
			throw new Error('no config constentLayerConfig found!')
		}
	})

	function acceptCookies() {
		Cookies.set('dbc-consent', 1, { expires: 30 })
		if (matomoBlock) {
			setMatomo(true)
		}
		hideBanner()
	}

	function declineCookies() {
		Cookies.set('dbc-consent', 0, { expires: 1 })
		if (matomoBlock) {
			setMatomo(false)
		}
		hideBanner()
	}

	function hideBanner() {
		hasTrackingCookie = true
	}

	function setMatomo(on: boolean): void {
		if (on) {
			window['_paq'].push(['setConsentGiven'])
			window['_paq'].push(['rememberConsentGiven'])
			matomoState.update(() => {
				return {
					tracking: true,
				}
			})
		} else {
			window['_paq'].push(['forgetConsentGiven'])
			window['_paq'].push(['forgetConsentGiven'])
			matomoState.update(() => {
				return {
					tracking: false,
				}
			})
		}
	}
</script>

{#if !hasTrackingCookie}
<div class="dbc-c-consent-layer__banner-wrapper">
	<div transition:slide class="dbc-c-consent-layer__banner">
		<div class="dbc-c-consent-layer__banner-container">
			<div class="dbc-c-consent-layer__banner-text">{@html snarkdown(consentBannerText)}</div>
			<div class="dbc-c-consent-layer__banner-buttons">
				<span
					class="dbc-c-consent-layer__banner-button dbc-c-consent-layer__banner-button--accept"
					on:click="{acceptCookies}"
					>Aktzeptieren</span
				>
				<span class="dbc-c-consent-layer__banner-button" on:click="{declineCookies}"
					>Ablehnen</span
				>
			</div>
		</div>
	</div>
</div>
{/if}

<style>
	:global(.dbc-c-consent-layer__banner-wrapper) {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		width: 100vw;
		height: 100vh;
		z-index: 800;
	}
	:global(.dbc-c-consent-layer__banner) {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: red;
		padding: 3rem 0;
		color: white;
	}

	:global(.dbc-c-consent-layer__banner-container) {
		display: flex;
		justify-content: space-between;
		max-width: 70vw;
	}

	:global(.dbc-c-consent-layer__banner-text) {
		flex: 0 1 60%;
	}

	:global(.dbc-c-consent-layer__banner-buttons) {
		flex: 0 1 40%;
		display: flex;
		justify-content: space-around;
	}

	:global(.dbc-c-consent-layer__banner-button) {
		padding: 0.8rem 1.2rem;
		color: white;
		cursor: pointer;
	}

	:global(.dbc-c-consent-layer__banner-button--accept) {
		background-color: darkred;
	}

	:global(.dbc-c-consent-layer) {
		max-width: 80vw;
		margin: 0 auto;
	}
</style>
