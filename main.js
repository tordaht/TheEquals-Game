const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

// Ana pencere referansını global olarak tut
let mainWindow

function createWindow() {
  // Ana pencereyi oluştur
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'Logo.png'),
    title: 'The Equals Game - v3.0 Beta',
    show: false, // Pencere hazır olana kadar gizle
    backgroundColor: '#121212'
  })

  // HTML dosyasını yükle
  mainWindow.loadFile('Index.HTML')

  // Pencere hazır olduğunda göster
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    
    // Geliştirici araçlarını aç (sadece geliştirme modunda)
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools()
    }
  })

  // Pencere kapatıldığında
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Menüyü oluştur
  createMenu()
}

// Menü oluştur
function createMenu() {
  const template = [
    {
      label: 'Dosya',
      submenu: [
        {
          label: 'Yeniden Başlat',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload()
          }
        },
        {
          label: 'Geliştirici Araçları',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools()
          }
        },
        { type: 'separator' },
        {
          label: 'Çıkış',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Görünüm',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Yardım',
      submenu: [
        {
          label: 'Hakkında',
          click: () => {
            require('electron').dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'The Equals Game',
              message: 'The Equals Game v3.0 Beta',
              detail: 'Devrimci bir interaktif hikaye oyunu\n\nSeri No: TEG-007\nVersiyon: 3.0 Beta\n\nGeliştirici: AI Assistant'
            })
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// Electron hazır olduğunda pencereyi oluştur
app.whenReady().then(createWindow)

// Tüm pencereler kapatıldığında uygulamayı kapat
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Güvenlik: Yeni pencere açılmasını engelle
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault()
  })
}) 