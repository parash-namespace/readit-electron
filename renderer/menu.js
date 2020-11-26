const { remote } = require('electron')


const template = [
{
	label: 'Items',
	submenu: [
	{
		label: "Add New",
		click: window.newItem,
		accelerator: "CmdOrCtrl+O"
	},{
		label: "Read Item",
		click: window.openItem,
		accelerator: "CmdOrCtrl+Enter"
	},{
		label: "Delete Item",
		click: window.deleteItem,
		accelerator: "CmdOrCtrl+Backspace"
	}
	]
},
{
	role: 'editMenu'
},
{
	role: 'windowMenu'
}
]


if(process.platform === 'darwin') {
	template.unshift({
		label: remote.app.getName(),
		submenu: [
		{role: 'about'},
		{type: 'separator'},
		{role: 'services'},
		{type: 'separator'},
		{role: 'hide'},
		{type: 'separator'},
		{role: 'hideothers'},
		{type: 'separator'},
		{role: 'unhide'},
		{type: 'separator'},
		{role: 'quit'},
		{type: 'separator'},
		]
	})
}

const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)