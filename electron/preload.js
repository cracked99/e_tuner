const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  scanDevices: (duration) => ipcRenderer.invoke('scanDevices', duration),
  analyzeDevice: (deviceAddress) => ipcRenderer.invoke('analyzeDevice', deviceAddress),
  sniffTraffic: (deviceAddress, duration) => ipcRenderer.invoke('sniffTraffic', deviceAddress, duration),
  spoofDevice: (deviceName, deviceId) => ipcRenderer.invoke('spoofDevice', deviceName, deviceId),
  runExploit: (exploitId, deviceAddress) => ipcRenderer.invoke('runExploit', exploitId, deviceAddress),
});