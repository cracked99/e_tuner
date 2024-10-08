"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scanner } from '@/components/Scanner';
import { Sniffer } from '@/components/Sniffer';
import { Spoofer } from '@/components/Spoofer';
import { Exploits } from '@/components/Exploits';

export default function Home() {
  const [activeTab, setActiveTab] = useState('scanner');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">e-tuner: BLE e-scooter security assessment tool</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="sniffer">Sniffer</TabsTrigger>
          <TabsTrigger value="spoofer">Spoofer</TabsTrigger>
          <TabsTrigger value="exploits">Exploits</TabsTrigger>
        </TabsList>
        <TabsContent value="scanner">
          <Card>
            <CardHeader>
              <CardTitle>BLE Scanner</CardTitle>
              <CardDescription>Scan for nearby BLE e-scooter devices</CardDescription>
            </CardHeader>
            <CardContent>
              <Scanner />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sniffer">
          <Card>
            <CardHeader>
              <CardTitle>BLE Sniffer</CardTitle>
              <CardDescription>Capture and analyze BLE traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <Sniffer />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="spoofer">
          <Card>
            <CardHeader>
              <CardTitle>BLE Spoofer</CardTitle>
              <CardDescription>Simulate BLE devices and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Spoofer />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exploits">
          <Card>
            <CardHeader>
              <CardTitle>Exploits</CardTitle>
              <CardDescription>Run predefined exploits and attacks</CardDescription>
            </CardHeader>
            <CardContent>
              <Exploits />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}