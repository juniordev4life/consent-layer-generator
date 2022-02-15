<script lang="ts">
	import { onMount } from 'svelte'
	import type { ConsentElement } from './interface/IConsentElement'
	import ConsentBlock from './components/ConsentBlock.svelte'
	import modalState from './store/modal'
	import matomoState from './store/matomo'
	import Cookies from 'js-cookie'
	import snarkdown from 'snarkdown'

	let language: string
	let consentModalHeadline: string = ''
	let consentModalBodyText: string = ''
	let matomoBlock: boolean = false
	let matomoConsentCookie: boolean = false
	let consentBlocks: [ConsentElement]

	onMount(() => {
		if (Cookies.get('mtm_consent') !== undefined) {
			if (Object.keys(Cookies.get('mtm_consent')).length !== 0) {
				matomoConsentCookie = true
				matomoState.update(() => {
					return {
						tracking: true,
					}
				})
			}
		}

		if (typeof window['consentLayerConfig'] !== 'undefined') {
			consentModalHeadline =
				window['consentLayerConfig']?.modal?.headline !== undefined
					? window['consentLayerConfig'].modal.headline
					: ''
			consentModalBodyText =
				window['consentLayerConfig']?.modal?.bodyText !== undefined
					? window['consentLayerConfig'].modal.bodyText
					: ''
			language = window['consentLayerConfig']?.language
				? window['consentLayerConfig'].language
				: 'DE-de'
			if (
				window['_paq'] !== undefined && // Check if Matomo variable is set on page
				window['consentLayerConfig'].matomo !== undefined &&
				window['consentLayerConfig'].matomo
			) {
				matomoBlock = true
			}
			consentBlocks = window['consentLayerConfig']?.modal?.layers
		} else {
			throw new Error('no config constentLayerConfig found!')
		}
	})

	function toggleMatomo(): void {
		if ($matomoState.tracking) {
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

	function closeModal(): void {
		modalState.update(() => {
			return {
				visible: false,
			}
		})
	}
</script>

{#if $modalState.visible}
<div class="dbc-c-consent-layer__modal-wrapper">
	<div class="dbc-c-consent-layer__modal-container">
		<span class="dbc-c-consent-layer__modal-button-close" on:click="{closeModal}"></span>
		<div class="dbc-c-consent-lyer__modal-headline">
			{@html snarkdown(consentModalHeadline)}
		</div>
		<div class="dbc-c-consent-lyer__modal-body">{@html snarkdown(consentModalBodyText)}</div>
		{#if matomoBlock}
		<div class="dbc-c-consent-layer__input-container">
			<input
				id="dbc-consent__matomo"
				class="dbc-c-consent-layer__input"
				data-cookie="mtm_consent"
				type="checkbox"
				name="dbc-consent__matomo"
				bind:checked="{$matomoState.tracking}"
				on:change="{toggleMatomo}"
			/><label class="dbc-c-consent-layer__label" for="dbc-consent__matomo"></label>
			<span class="dbc-c-consent-layer__label-status"
				>{$matomoState.tracking ? 'On' : 'Off'}</span
			>
			<span class="dbc-c-consent-layer__label-text"
				>Anonyme Nutzungsdaten via Matomo bereitstellen.</span
			>
		</div>

		{/if} {#each consentBlocks as consentBlock}
		<ConsentBlock
			name="{consentBlock.name}"
			text="{consentBlock.text}"
			fieldName="{consentBlock.fieldName}"
			callbackFunction="{consentBlock.callbackFunction}"
			setAsDefault="{consentBlock.setAsDefault}"
			cookieName="{consentBlock.cookieName}"
			cookieValue="{consentBlock.cookieValue}"
			cookieExpire="{consentBlock.cookieExpire}"
			cookies="{consentBlock.cookies}"
		/>
		{/each}
	</div>
</div>
{/if}

<style>
	:global(.dbc-c-consent-layer__modal-wrapper) {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(51, 51, 51, 0.6);
		z-index: 900;
	}

	:global(.dbc-c-consent-layer__modal-container) {
		position: fixed;
		top: 25%;
		bottom: 25%;
		left: 25%;
		right: 25%;
		height: 50%;
		max-height: 50%;
		width: auto;
		padding: 2rem;
		background-color: rgba(255, 255, 255);
		z-index: 800;
		overflow-y: scroll;
	}

	:global(.dbc-c-consent-layer__modal-button-close) {
		position: absolute;
		right: 2rem;
		top: 2rem;
		cursor: pointer;
		width: 32px;
		height: 32px;
		opacity: 0.3;
	}

	:global(.dbc-c-consent-layer__modal-button-close:hover) {
		opacity: 1;
	}

	:global(.dbc-c-consent-layer__modal-button-close:after),
	:global(.dbc-c-consent-layer__modal-button-close:before) {
		position: absolute;
		left: 15px;
		content: ' ';
		height: 33px;
		width: 2px;
		background-color: #333;
	}

	:global(.dbc-c-consent-layer__modal-button-close:after) {
		transform: rotate(-45deg);
	}

	:global(.dbc-c-consent-layer__modal-button-close:before) {
		transform: rotate(45deg);
	}

	:global(.dbc-c-consent-layer__input-container) {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		height: 65px;
	}

	:global(.dbc-c-consent-layer__input) {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	:global(.dbc-c-consent-layer__label) {
		cursor: pointer;
		text-indent: -9999px;
		width: 50px;
		height: 30px;
		background: grey;
		display: block;
		border-radius: 15px;
		position: relative;
	}

	:global(.dbc-c-consent-layer__label:after) {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		width: 20px;
		height: 20px;
		background: #fff;
		border-radius: 20px;
		transition: 0.3s;
	}

	:global(.dbc-c-consent-layer__input:checked + .dbc-c-consent-layer__label) {
		background: green;
	}

	:global(.dbc-c-consent-layer__input:checked + .dbc-c-consent-layer__label:after) {
		left: calc(100% - 5px);
		transform: translateX(-100%);
	}

	:global(.dbc-c-consent-layer__label:active:after) {
		width: 30px;
	}

	:global(.dbc-c-consent-layer__label-text) {
		margin-left: 2rem;
		flex: 0 1 80%;
	}

	:global(.dbc-c-consent-layer__label-status) {
		position: absolute;
		bottom: 0;
		left: 20px;
		font-size: 0.8rem;
		color: #666;
	}
</style>
