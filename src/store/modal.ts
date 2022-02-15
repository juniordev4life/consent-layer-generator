import { writable } from 'svelte/store'

const modalState = writable({
	visible: false,
})

export default modalState
