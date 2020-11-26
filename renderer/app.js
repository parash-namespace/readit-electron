const { ipcRenderer } = require('electron')
const items = require('./items')

window.newItem = () => {
	showModal.click()
}
window.openItem = items.open
window.deleteItem = () => {
	let selectedItem = items.getSelectedItem()
	items.delete(selectedItem.index)
}

let closeModal = document.getElementById('close-modal')
showModal = document.getElementById('show-modal')
modal = document.getElementById('modal')
addItem = document.getElementById('add-item')
urlInput = document.getElementById('url')
search = document.getElementById('search')

// show modal
showModal.addEventListener('click', () => {
	modal.style.display = 'flex'
	urlInput.focus()
})

// close modal
closeModal.addEventListener('click', () => {
	modal.style.display = 'none'
})

urlInput.addEventListener('keyup', e => {
	if(e.key==='Enter') addItem.click()
})

addItem.addEventListener('click', () => {
	if(url = urlInput.value){
		ipcRenderer.send('new-item', url)
		toggleSubmitButton()
	}
})

ipcRenderer.on('new-item-response', (e, newItem) => {
	toggleSubmitButton()
	modal.style.display = 'none'
	urlInput.value = ''

	items.addItem(newItem, true)
})

const toggleSubmitButton = () => {
	if(addItem.disabled === true){
		addItem.disabled = false
		addItem.style.opacity = 1
		addItem.innerText = 'Add Item'
		closeModal.style.display = 'inline'
	}else{
		addItem.disabled = true
		addItem.style.opacity = 0.5
		addItem.innerText = 'Adding...'
		closeModal.style.display = 'none'
	}
}


search.addEventListener('keyup', e => {
	Array.from( document.getElementsByClassName('read-item') ).forEach( item => {
		let hasMatch = item.innerText.toLowerCase().includes(search.value.toLowerCase())
		item.style.display = hasMatch ? 'flex' : 'none'
	})
})