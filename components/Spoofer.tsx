"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { spoofDevice } from '@/lib/ble';

export function Spoofer() {
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [spoofing, setSpoofing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const startSpoofing = async () => {
    if (!deviceName || !deviceId) {
      setError('Please enter both device name and ID');
      return;
    }

    setSpoofing(true);
    setError(null);
    setSuccess(null);
    try {
      await spoofDevice(deviceName, deviceId);
      setSuccess(`Spoofing device: ${deviceName} (${deviceId})`);
    } catch (error) {
      console.error('Spoofing failed:', error);
      setError('Spoofing failed. Please check the device details and try again.');
    } finally {
      setSpoofing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="deviceName">Device Name</Label>
        <Input
          type="text"
          id="deviceName"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="E-Scooter 1"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="deviceId">Device ID</Label>
        <Input
          type="text"
          id="deviceId"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="00:11:22:33:44:55"
        />
      </div>
      <Button onClick={startSpoofing} disabled={spoofing || !deviceName || !deviceId}>
        {spoofing ? 'Spoofing...' : 'Start Spoofing'}
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="default">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}