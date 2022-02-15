import { writable } from 'svelte/store'

const matomoState = writable({
	tracking: false,
})

export default matomoState
