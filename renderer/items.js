const fs = require('fs')
let items = document.getElementById('items')

let readerJS
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
	readerJS = data.toString()
})

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

exports.addItem = (item, isNew = false) => {
	let itemNode = document.createElement('div')
	itemNode.setAttribute('class', 'read-item')
	itemNode.setAttribute('data-url', item.url)

	itemNode.innerHTML = `<img src="${ item.ss }"><h2>${ item.title }</h2>`

	items.appendChild(itemNode)

	itemNode.addEventListener('click', this.select)
	itemNode.addEventListener('dblclick', this.open)

	if(document.getElementsByClassName('read-item').length === 1){
		itemNode.classList.add('selected')
	}

	if(isNew){
		this.storage.push(item)
		localStorage.setItem('readit-items', JSON.stringify(this.storage))
	}
}

exports.open = () => {
	if(!this.storage.length) return

	let selectedItem = document.getElementsByClassName('read-item selected')[0]
	let contentURL = selectedItem.dataset.url

	let readerWindow = window.open(contentURL, '', `
		maxWidth=2000,
		maxHeight=2000,
		width=1200,
		height=800,
		backgroundColor=#DEDEDE,
		nodeIntegration=0,
		contextIsolation=1
	`)

	readerWindow.eval(readerJS)

}

exports.select = selected => {
	document.getElementsByClassName('read-item selected')[0].classList.remove('selected')
	selected.currentTarget.classList.add('selected')
}

this.storage.forEach(item => {
	this.addItem(item)
})