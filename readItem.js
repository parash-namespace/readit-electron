const { BrowserWindow } = require('electron')

let offScreenWindow

module.exports = (url, callback) => {
	offScreenWindow = new BrowserWindow({
		width: 500,
		height: 500,
		show: false,
		preferences: {
			offscreen: true
		}
	})

	offScreenWindow.loadURL(url)

	offScreenWindow.webContents.on('did-finish-load', e => {


		let title = offScreenWindow.getTitle()
		offScreenWindow.webContents.capturePage()
		.then(image => {
			let ss = image.toDataURL()

			callback({ title, ss, url })
			offScreenWindow.close()
			offScreenWindow = null
		})

	})
}