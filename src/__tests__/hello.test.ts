import { render } from '@testing-library/svelte'
import Layer from '../Layer.svelte'

test('should render', () => {
	const results = render(Layer, { props: { name: 'world' } })

	//expect(() => results.getByText('Hello world!')).not.toThrow()
})
