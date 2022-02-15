import Banner from './Banner.svelte'
import Modal from './Modal.svelte'
import Settings from './Settings.svelte'

new Banner({
	target: document.querySelector('#dbc-consent-banner'),
})

new Modal({
	target: document.querySelector('#dbc-consent-modal'),
})

new Settings({
	target: document.querySelector('#dbc-consent-settings'),
})

console.log(
	`___________   _______________________________________^__
 ___   ___ |||  ___   ___   ___    ___ ___  |   __  ,----\\
|   | |   |||| |   | |   | |   |  |   |   | |  |  | |_____\\
|___| |___|||| |___| |___| |___|  | O | O | |  |  |        \\
           |||                    |___|___| |  |__|  DB     )
___________|||______________________________|______________/
           |||                                        /--------
-----------'''---------------------------------------/-------
--------------- We are hiring! ----------------------

You want to be a part of our ride? Come on board and join us.
https://karriere.deutschebahn.com/service/search/karriere-de/2653760?qli=true&query=&operationsarea=Informatik&legalentity=Deutsche+Bahn+Connect+GmbH&sort=pubExternalDate_tdt`,
)
