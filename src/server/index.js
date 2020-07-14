const { ipcMain } = require('electron')

ipcMain.on('cShortcut', (event) => {
    event.reply('cShortcut', 'pong')
})
