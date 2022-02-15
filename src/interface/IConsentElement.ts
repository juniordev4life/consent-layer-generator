export interface ConsentElement {
	name: string
	text: string
	fieldName: string
	callbackFunction: string
	setAsDefault: boolean
	cookieName: string
	cookieValue: string
	cookieExpire: number
	cookies: [
		{
			name: string
			description: string
		},
	]
}
