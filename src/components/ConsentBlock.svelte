<script lang="ts">
	import { onMount } from 'svelte'
	import Cookies from 'js-cookie'
	import type { ConsentCookie } from './interface/IConsentCookie'
	import snarkdown from 'snarkdown'

	export let name: string
	export let text: string
	export let fieldName: string
	export let callbackFunction: string
	export let setAsDefault: boolean
	export let cookieName: string
	export let cookieValue: string
	export let cookieExpire: number = 7
	export let cookies: [ConsentCookie]

	let cookieSet: boolean = false
	let showCookies: boolean = false

	onMount(() => {
		if (Cookies.get(cookieName) !== undefined) {
			cookieSet = Object.keys(Cookies.get(cookieName)).length !== 0
		}

		if (setAsDefault) {
			cookieSet = true
		}
	})

	function toggleField(): void {
		window[callbackFunction](cookieSet)
		if (cookieSet) {
			Cookies.set(cookieName, cookieValue, { expires: cookieExpire })
		} else {
			Cookies.remove(cookieName)
		}
	}

	function toggleShowCookies(): void {
		showCookies = !showCookies
	}
</script>

<div class="dbc-c-consent-layer__input-container">
	<input
		id="dbc-consent__${fieldName}"
		class="dbc-c-consent-layer__input"
		data-cookie="mtm_consent"
		type="checkbox"
		name="dbc-consent__${fieldName}"
		bind:checked="{cookieSet}"
		on:change="{toggleField}"
	/><label class="dbc-c-consent-layer__label" for="dbc-consent__${fieldName}"></label>
	<span class="dbc-c-consent-layer__label-status">{cookieSet ? 'On' : 'Off'}</span>
	<span class="dbc-c-consent-layer__label-text">{@html snarkdown(text)}</span>
	<span class="dbc-c-consent-layer__show-cookies" on:click="{toggleShowCookies}"
		>{showCookies ? 'weniger' : 'mehr'}</span
	>
</div>
{#if showCookies}
<div class="dbc-c-consent-layer__cookies">
	<div class="dbc-c-consent-layer__cookie-headline">
		<span class="dbc-c-consent-layer__cookie-name">Name</span>
		<span class="dbc-c-consent-layer__cookie-description">Beschreibung</span>
		<span class="dbc-c-consent-layer__cookie-expires">Ablaufzeit</span>
	</div>
	{#each cookies as cookie}
	<div class="dbc-c-consent-layer__cookie-description-container">
		<span class="dbc-c-consent-layer__cookie-name">{cookie.name}</span
		><span class="dbc-c-consent-layer__cookie-description">{cookie.description}</span>
		<span class="dbc-c-consent-layer__cookie-expires">{cookie?.expire}</span>
	</div>
	{/each}
</div>
{/if}

<style>
	:global(.dbc-c-consent-layer__cookies) {
		margin-top: 1rem;
		padding: 1rem 0;
	}

	:global(.dbc-c-consent-layer__cookie-description-container),
	:global(.dbc-c-consent-layer__cookie-headline) {
		padding: 1rem;
		display: flex;
		justify-content: flex-start;
	}

	:global(.dbc-c-consent-layer__cookie-headline) {
		padding-top: 0;
		border-bottom: 1px solid #ccc;
	}

	/* :global(.dbc-c-consent-layer__cookie-description-container:nth-child(even)) {
		background-color: #f2f2f2;
	} */

	:global(.dbc-c-consent-layer__cookie-name) {
		flex: 0 1 20%;
	}

	:global(.dbc-c-consent-layer__cookie-description) {
		flex: 0 1 60%;
	}

	:global(.dbc-c-consent-layer__cookie-expires) {
		flex: 0 1 20%;
	}
</style>
