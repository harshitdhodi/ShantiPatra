import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator } from 'lucide-react'

export default function Test() {
  const [length, setLength] = useState(1000)
  const [width, setWidth] = useState(48)
  const [filmThickness, setFilmThickness] = useState(10)
  const [adhesiveThickness, setAdhesiveThickness] = useState(10)
  const [coreThickness, setCoreThickness] = useState(3)
  const [coreID, setCoreID] = useState(76)

  const [results, setResults] = useState({
    coreWeight: { value: '0.00', margin: '0.00' },
    netWeight: { value: '0.00', margin: '0.00' },
    grossWeight: { value: '0.00', margin: '0.00' }
  })

  const calculateWeights = () => {
    // Core Weight calculation
    const coreWeight = 30 * (coreThickness / 3) * (width / 48) * (coreID / 76)
    
    // Net Weight calculation
    const netWeight = ((filmThickness * 0.905) + (adhesiveThickness * 1.05)) * width * length / 1000
    
    // Gross Weight calculation
    const grossWeight = coreWeight + netWeight

    setResults({
      coreWeight: {
        value: coreWeight.toFixed(2),
        margin: (coreWeight * 0.01).toFixed(2)
      },
      netWeight: {
        value: netWeight.toFixed(2),
        margin: (netWeight * 0.01).toFixed(2)
      },
      grossWeight: {
        value: grossWeight.toFixed(2),
        margin: (grossWeight * 0.01).toFixed(2)
      }
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Stock Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="length">Length (cm)</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width (cm)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filmThickness">Film Thickness (μm)</Label>
              <Input
                id="filmThickness"
                type="number"
                value={filmThickness}
                onChange={(e) => setFilmThickness(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adhesiveThickness">Adhesive Thickness (μm)</Label>
              <Input
                id="adhesiveThickness"
                type="number"
                value={adhesiveThickness}
                onChange={(e) => setAdhesiveThickness(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coreThickness">Core Thickness (mm)</Label>
              <Input
                id="coreThickness"
                type="number"
                value={coreThickness}
                onChange={(e) => setCoreThickness(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coreID">Core ID (mm)</Label>
              <Input
                id="coreID"
                type="number"
                value={coreID}
                onChange={(e) => setCoreID(Number(e.target.value))}
              />
            </div>
          </div>

          <Button 
            onClick={calculateWeights}
            className="w-40 mt-8 bg-cyan-400 hover:bg-cyan-500 text-white"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate
          </Button>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Core Weight (gms)</Label>
                <div className="flex items-center space-x-2 text-lg">
                  <span>{results.coreWeight.value}</span>
                  <span className="text-gray-500">±</span>
                  <span className="text-gray-500">{results.coreWeight.margin}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Net Weight (gms)</Label>
                <div className="flex items-center space-x-2 text-lg">
                  <span>{results.netWeight.value}</span>
                  <span className="text-gray-500">±</span>
                  <span className="text-gray-500">{results.netWeight.margin}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Gross Weight (gms)</Label>
                <div className="flex items-center space-x-2 text-lg">
                  <span>{results.grossWeight.value}</span>
                  <span className="text-gray-500">±</span>
                  <span className="text-gray-500">{results.grossWeight.margin}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}