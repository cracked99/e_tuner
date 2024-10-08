"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { sniffTraffic } from '@/lib/ble';

export function Sniffer() {
  const [sniffing, setSniffing] = useState(false);
  const [packets, setPackets] = useState([]);
  const [deviceAddress, setDeviceAddress] = useState('');
  const [error, setError] = useState(null);

  const startSniffing = async () => {
    if (!deviceAddress) {
      setError('Please enter a device address');
      return;
    }

    setSniffing(true);
    setError(null);
    try {
      const sniffedPackets = await sniffTraffic(deviceAddress, 10000);
      setPackets(sniffedPackets);
    } catch (error) {
      console.error('Sniffing failed:', error);
      setError('Sniffing failed. Please check the device address and try again.');
    } finally {
      setSniffing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="deviceAddress">Device Address</Label>
        <Input
          type="text"
          id="deviceAddress"
          value={deviceAddress}
          onChange={(e) => setDeviceAddress(e.target.value)}
          placeholder="00:11:22:33:44:55"
        />
      </div>
      <Button onClick={startSniffing} disabled={sniffing}>
        {sniffing ? 'Sniffing...' : 'Start Sniffing'}
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
            <TableHead>Timestamp</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Characteristic</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packets.map((packet, index) => (
            <TableRow key={index}>
              <TableCell>{packet.timestamp}</TableCell>
              <TableCell>{packet.service}</TableCell>
              <TableCell>{packet.characteristic}</TableCell>
              <TableCell>{packet.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}