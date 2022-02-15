<script lang="ts">
	import { onMount } from 'svelte'
	import modalState from './store/modal'
	let language: string

	onMount(() => {
		if (typeof window['consentLayerConfig'] !== 'undefined') {
			language = window['consentLayerConfig']?.language
				? window['consentLayerConfig'].language
				: 'DE-de'
		} else {
			throw new Error('no config constentLayerConfig found!')
		}
	})

	function openModal(): void {
		modalState.update(() => {
			return {
				visible: true,
			}
		})
	}
</script>

<span class="dbc-c-consent__settings-link" on:click="{openModal}"
	>Cookie einstellungen anpassen</span
>

<style>
	:global(.dbc-c-consent__settings-link) {
		cursor: pointer;
	}
</style>
