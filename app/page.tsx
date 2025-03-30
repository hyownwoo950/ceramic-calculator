"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CeramicCalculator() {
  const [area, setArea] = useState(0);
  const [grade, setGrade] = useState("premium");
  const [jolly, setJolly] = useState(false);
  const [inlet, setInlet] = useState(0);
  const [bolt, setBolt] = useState(0);
  const [cooktop, setCooktop] = useState(0);
  const [outlet, setOutlet] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [result, setResult] = useState(null);

  const [prices, setPrices] = useState({
    material: {
      basic: 99610,
      standard: 109570,
      premium: 139840,
    },
    processing: 50000,
    jolly: 12000,
    inlet: 30000,
    bolt: 80000,
    cooktop: 60000,
    outlet: 34000,
    install: 112000,
  });

  const calculate = () => {
    const materialCost = area * prices.material[grade];
    const processingCost = area * prices.processing;
    const jollyCost = jolly ? area * prices.jolly : 0;
    const inletCost = inlet * prices.inlet;
    const boltCost = bolt * prices.bolt;
    const cooktopCost = cooktop * prices.cooktop;
    const outletCost = outlet * prices.outlet;
    const installCost = area * prices.install;

    const total =
      materialCost +
      processingCost +
      jollyCost +
      inletCost +
      boltCost +
      cooktopCost +
      outletCost +
      installCost;

    const quote = {
      customerName,
      customerContact,
      materialCost,
      processingCost,
      jollyCost,
      inletCost,
      boltCost,
      cooktopCost,
      outletCost,
      installCost,
      total,
    };

    localStorage.setItem("latestQuote", JSON.stringify(quote));
    setResult(quote);
  };

  const parseInput = (value) => {
    const num = parseInt(value, 10);
    return isNaN(num) || num < 0 ? 0 : num;
  };

  return (
    <main className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-center mb-6">Ceramic Estimate Calculator</h1>
      <Card className="max-w-2xl mx-auto p-4 space-y-4 shadow-xl rounded-2xl">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Customer Name</Label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div>
              <Label>Contact Info</Label>
              <Input value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} />
            </div>
          </div>

          <Label>Area (㎡)</Label>
          <Input type="number" value={area} onChange={(e) => setArea(parseFloat(e.target.value) || 0)} />

          <Label>Grade</Label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full border p-2 rounded">
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>

          <Label>Jolly Cut</Label>
          <input type="checkbox" checked={jolly} onChange={(e) => setJolly(e.target.checked)} className="ml-2" />

          <Label>Inlet Holes</Label>
          <Input type="number" value={inlet} onChange={(e) => setInlet(parseInput(e.target.value))} />

          <Label>Bolt Holes</Label>
          <Input type="number" value={bolt} onChange={(e) => setBolt(parseInput(e.target.value))} />

          <Label>Cooktop Holes</Label>
          <Input type="number" value={cooktop} onChange={(e) => setCooktop(parseInput(e.target.value))} />

          <Label>Outlet Holes</Label>
          <Input type="number" value={outlet} onChange={(e) => setOutlet(parseInput(e.target.value))} />

          <Button onClick={calculate} className="mt-4 w-full">Calculate</Button>

          {result && (
            <div className="mt-6 space-y-2">
              <div><strong>Name:</strong> {result.customerName}</div>
              <div><strong>Contact:</strong> {result.customerContact}</div>
              <div>Material Cost: ₩{result.materialCost.toLocaleString()}</div>
              <div>Processing Cost: ₩{result.processingCost.toLocaleString()}</div>
              {jolly && <div>Jolly Cut Cost: ₩{result.jollyCost.toLocaleString()}</div>}
              <div>Inlet Hole Cost: ₩{result.inletCost.toLocaleString()}</div>
              <div>Bolt Hole Cost: ₩{result.boltCost.toLocaleString()}</div>
              <div>Cooktop Hole Cost: ₩{result.cooktopCost.toLocaleString()}</div>
              <div>Outlet Hole Cost: ₩{result.outletCost.toLocaleString()}</div>
              <div>Installation Cost: ₩{result.installCost.toLocaleString()}</div>
              <div className="font-bold text-xl mt-4">Total: ₩{result.total.toLocaleString()}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
