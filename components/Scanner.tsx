"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { scanDevices, analyzeDevice } from '@/lib/ble';

export function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const startScan = async () => {
    setScanning(true);
    setError(null);
    try {
      const scannedDevices = await scanDevices(10000);
      setDevices(scannedDevices);
    } catch (error) {
      console.error('Scanning failed:', error);
      setError(`Scanning failed: ${error.message}`);
    } finally {
      setScanning(false);
    }
  };

  const analyzeSelectedDevice = async (deviceAddress) => {
    setAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeDevice(deviceAddress);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(`Device analysis failed: ${error.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={startScan} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Start Scan'}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>RSSI</TableHead>
            <TableHead>Services</TableHead>
            <TableHead>Vulnerabilities</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.address}>
              <TableCell>{device.address}</TableCell>
              <TableCell>{device.name || 'Unknown'}</TableCell>
              <TableCell>{device.rssi} dBm</TableCell>
              <TableCell>{device.services.join(', ')}</TableCell>
              <TableCell>{device.vulnerabilities.join(', ')}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => analyzeSelectedDevice(device.address)} disabled={analyzing}>
                      {analyzing ? 'Analyzing...' : 'Analyze'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Device Analysis</DialogTitle>
                      <DialogDescription>
                        Detailed analysis of the selected device
                      </DialogDescription>
                    </DialogHeader>
                    {analysisResult && (
                      <div>
                        <h3>Services:</h3>
                        <ul>
                          {analysisResult.services.map((service) => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                        <h3>Characteristics:</h3>
                        {Object.entries(analysisResult.characteristics).map(([service, chars]) => (
                          <div key={service}>
                            <h4>{service}</h4>
                            <ul>
                              {chars.map((char) => (
                                <li key={char}>{char}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <h3>Vulnerabilities:</h3>
                        <ul>
                          {analysisResult.vulnerabilities.map((vuln, index) => (
                            <li key={index}>{vuln}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}