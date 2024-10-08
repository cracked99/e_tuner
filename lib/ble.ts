// Mock data for browser environment
const mockDevices = [
  { address: '00:11:22:33:44:55', name: 'Mock E-Scooter 1', rssi: -65, services: ['Battery Service'], vulnerabilities: ['Weak Authentication'] },
  { address: '66:77:88:99:AA:BB', name: 'Mock E-Scooter 2', rssi: -72, services: ['Motor Control'], vulnerabilities: ['Unencrypted Communication'] },
];

const isElectron = () => {
  return window.electronAPI !== undefined;
};

export async function scanDevices(duration: number = 10000): Promise<any[]> {
  if (isElectron()) {
    try {
      const result = await window.electronAPI.scanDevices(duration);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error('Scanning failed:', error);
      throw new Error(`Scanning failed: ${error.message || 'Unknown error'}`);
    }
  } else {
    // Mock implementation for browser environment
    console.log('Running in browser environment. Using mock data.');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate scanning delay
    return mockDevices;
  }
}

export async function analyzeDevice(deviceAddress: string): Promise<any> {
  if (isElectron()) {
    try {
      const result = await window.electronAPI.analyzeDevice(deviceAddress);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error('Device analysis failed:', error);
      throw new Error(`Device analysis failed: ${error.message || 'Unknown error'}`);
    }
  } else {
    // Mock implementation for browser environment
    console.log('Running in browser environment. Using mock data.');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate analysis delay
    return {
      services: ['Battery Service', 'Motor Control'],
      characteristics: {
        'Battery Service': ['Battery Level'],
        'Motor Control': ['Speed', 'Direction']
      },
      vulnerabilities: ['Weak Authentication', 'Unencrypted Communication']
    };
  }
}

export async function sniffTraffic(deviceAddress: string, duration: number): Promise<any[]> {
  if (isElectron()) {
    try {
      const result = await window.electronAPI.sniffTraffic(deviceAddress, duration);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error('Traffic sniffing failed:', error);
      throw new Error(`Traffic sniffing failed: ${error.message || 'Unknown error'}`);
    }
  } else {
    // Mock implementation for browser environment
    console.log('Running in browser environment. Using mock data.');
    await new Promise(resolve => setTimeout(resolve, duration)); // Simulate sniffing duration
    return [
      { timestamp: new Date().toISOString(), service: 'Battery Service', characteristic: 'Battery Level', value: '75%' },
      { timestamp: new Date().toISOString(), service: 'Motor Control', characteristic: 'Speed', value: '15 km/h' },
    ];
  }
}

export async function spoofDevice(deviceName: string, deviceId: string): Promise<void> {
  if (isElectron()) {
    try {
      const result = await window.electronAPI.spoofDevice(deviceName, deviceId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error('Device spoofing failed:', error);
      throw new Error(`Device spoofing failed: ${error.message || 'Unknown error'}`);
    }
  } else {
    // Mock implementation for browser environment
    console.log('Running in browser environment. Simulating device spoofing.');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate spoofing delay
    console.log(`Spoofed device: ${deviceName} (${deviceId})`);
  }
}

export async function runExploit(exploitId: string, deviceAddress: string): Promise<any> {
  if (isElectron()) {
    try {
      const result = await window.electronAPI.runExploit(exploitId, deviceAddress);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error('Exploit execution failed:', error);
      throw new Error(`Exploit execution failed: ${error.message || 'Unknown error'}`);
    }
  } else {
    // Mock implementation for browser environment
    console.log('Running in browser environment. Simulating exploit execution.');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate exploit execution delay
    return { success: true, message: `Simulated exploit ${exploitId} executed on device ${deviceAddress}` };
  }
}