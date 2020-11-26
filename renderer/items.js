const fs = require('fs')
let items = document.getElementById('items')

let readerJS
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
	readerJS = data.toString()
})

window.addEventListener('message', e => {

	if(e.data.action == 'delete-reader-item'){
		this.delete(e.data.itemIndex)
		e.source.close()
	}
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
		this.save()
	}
}


exports.save = () => localStorage.setItem('readit-items', JSON.stringify(this.storage))

exports.delete = (itemIndex) => {
	items.removeChild( items.childNodes[itemIndex] )
	this.storage.splice((itemIndex - 1), 1)
	this.save()

	document.getElementsByClassName('read-item')[0].classList.add('selected')
}

exports.open = () => {
	if(!this.storage.length) return

	let selectedItem = this.getSelectedItem()
	let contentURL = selectedItem.url

	let readerWindow = window.open(contentURL, '', `
		maxWidth=2000,
		maxHeight=2000,
		width=1200,
		height=800,
		backgroundColor=#DEDEDE,
		nodeIntegration=0,
		contextIsolation=1
	`)
	readerWindow.eval(readerJS.replace('{{index}}', selectedItem.index))
}

exports.getSelectedItem = () => {
	let currentItem = document.getElementsByClassName('read-item selected')[0]
	let itemIndex = 0
	let child = currentItem

	while( ((child = child.previousSibling) != null )){ itemIndex = itemIndex + 1 }

	return { node: currentItem, index: itemIndex, url: currentItem.dataset.url }
}

exports.select = selected => {
	this.getSelectedItem().node.classList.remove('selected')
	selected.currentTarget.classList.add('selected')
}

this.storage.forEach(item => {
	this.addItem(item)
})
