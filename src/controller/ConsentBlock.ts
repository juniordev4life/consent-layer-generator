import type { ConsentElement } from '../interface/IConsentElement'
import Cookies from 'js-cookie'

class ConsentBlock implements ConsentElement {
	name: string
	text: string
	fieldName: string
	callbackFunction: string
	setAsDefault: boolean
	cookieName: string
	checked: string

	constructor(
		name: string,
		text: string,
		fieldName: string,
		callbackFunction: string,
		setAsDefault: boolean,
		cookieName: string,
	) {
		this.name = name
		this.text = text
		this.fieldName = fieldName
		this.callbackFunction = callbackFunction
		this.cookieName = cookieName
		let cookieSet: boolean = false
		if (Cookies.get(cookieName) !== undefined) {
			cookieSet = Object.keys(Cookies.get(cookieName)).length !== 0
		}
		this.checked = cookieSet || setAsDefault ? 'checked="checked"' : ''
	}
	render(): string {
		return `
    <div>
      <input id="${this.fieldName}" data-cookie="${this.cookieName}" type="checkbox" name="${this.fieldName}" ${this.checked}  onClick="${this.callbackFunction}()"/><label for="${this.fieldName}">${this.text}</label>
    </div>`
	}
}

export { ConsentBlock }
