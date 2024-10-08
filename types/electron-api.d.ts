interface ElectronAPI {
  scanDevices: (duration: number) => Promise<any[]>;
  analyzeDevice: (deviceAddress: string) => Promise<any>;
  sniffTraffic: (deviceAddress: string, duration: number) => Promise<any[]>;
  spoofDevice: (deviceName: string, deviceId: string) => Promise<void>;
  runExploit: (exploitId: string, deviceAddress: string) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};