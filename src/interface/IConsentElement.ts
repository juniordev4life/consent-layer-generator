export interface ConsentElement {
	name: string
	text: string
	fieldName: string
	callbackFunction: string
	setAsDefault: boolean
	cookies: [
		{
			name: string
			description: string
		},
	]
}
