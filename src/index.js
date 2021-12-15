const { createWindow } = require('./main');
const { app } = require('electron');
require('electron-reload')(__dirname);

require('./database');

app.whenReady().then( createWindow );
app.allowRendererProcessReuse = false;