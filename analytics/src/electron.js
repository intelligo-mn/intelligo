const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');
const url = require('url');
const appVersion = require('./package.json').version;
const { autoUpdater } = require('electron-updater');

let win;

function createWindow() {
	win = new BrowserWindow({ width: 900, height: 600, show: false });
	if (process.platform === 'darwin') {
		autoUpdater.on('update-available', (info) => {
			dialog.showMessageBox(win, {
				type: 'question',
				buttons: ['Yes', 'No'],
				message: `Update ${info.version} Available!\nWould you like to download it?`
			}, (response) => {
				if (response === 0)
					shell.openExternal(`https://cdn.ana.chat/dist/ana-analytics/mac-x64/Ana%20Analytics-${info.version}.dmg`);
			});
		});
	}
	autoUpdater.checkForUpdatesAndNotify();

	splash = new BrowserWindow({ width: 810, height: 610, transparent: true, frame: false, alwaysOnTop: true });
	splash.loadURL(`file://${__dirname}/splash.html`);

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.once('ready-to-show', () => {
		splash.destroy();
		win.show();
	});

	win.on('closed', () => {
		win = null
	});

	const template = [
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'pasteandmatchstyle' },
				{ role: 'delete' },
				{ role: 'selectall' }
			]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' },
				{ role: 'toggledevtools' }
			]
		},
		{
			role: 'window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'close' }
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'About Ana',
					click() { shell.openExternal('http://ana.chat') }
				},
				{
					label: 'Version ' + appVersion,
					enabled: false
				}
			]
		}
	]

	if (process.platform === 'darwin') {
		template.unshift({
			label: app.getName(),
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services', submenu: [] },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		})

		// Edit menu
		template[1].submenu.push(
			{ type: 'separator' },
			{
				label: 'Speech',
				submenu: [
					{ role: 'startspeaking' },
					{ role: 'stopspeaking' }
				]
			}
		)

		// Window menu
		template[3].submenu = [
			{ role: 'close' },
			{ role: 'minimize' },
			{ role: 'zoom' },
			{ type: 'separator' },
			{ role: 'front' }
		]
	} else {
		template.unshift({
			label: 'File',
			submenu: [
				{ role: 'quit' }
			]
		})
	}

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit()
})

app.on('activate', () => {
	if (win === null)
		createWindow()
})
