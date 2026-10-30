import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Calculator,
  Shirt,
  Layers,
  Scale,
  Package,
  Truck,
  Leaf,
  ShoppingBag,
  RotateCcw,
  Factory,
} from "lucide-react"
import { fadeInUp } from "@/lib/motion"
import { CATEGORIES } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// --- Emission factors (simplified, educational estimates in kg CO₂e) ---

// Production emissions per kg of material (kg CO₂e / kg)
const MATERIALS = [
  { value: "recycled_polyester", label: "Recycled Polyester", factor: 4 },
  { value: "polyester", label: "Polyester", factor: 9 },
  { value: "organic_cotton", label: "Organic Cotton", factor: 5 },
  { value: "recycled_cotton", label: "Recycled Cotton", factor: 3 },
  { value: "cotton", label: "Conventional Cotton", factor: 8 },
  { value: "linen", label: "Linen", factor: 5 },
  { value: "viscose", label: "Viscose", factor: 6 },
  { value: "nylon", label: "Nylon", factor: 9 },
  { value: "wool", label: "Wool", factor: 24 },
  { value: "cashmere", label: "Cashmere", factor: 28 },
  { value: "silk", label: "Silk", factor: 11 },
  { value: "leather", label: "Leather", factor: 17 },
  { value: "denim", label: "Denim", factor: 12 },
  { value: "mixed", label: "Mixed / Other", factor: 7 },
]

// Manufacturing overhead multiplier per product category
const CATEGORY_FACTORS = {
  clothing: 1.0,
  accessories: 0.8,
  home: 1.1,
  electronics: 3.0,
  beauty: 0.7,
  food: 0.5,
  garden: 0.9,
  cleaning: 0.6,
}

// Flat packaging emissions (kg CO₂e per item)
const PACKAGING = [
  { value: "minimal", label: "Minimal / None", factor: 0.05 },
  { value: "recycled", label: "Recycled / Cardboard", factor: 0.2 },
  { value: "standard", label: "Standard / Mixed", factor: 0.4 },
  { value: "plastic", label: "Plastic", factor: 0.6 },
]

// Transport emissions per kg per km (converted from kg CO₂e per tonne-km)
const TRANSPORT = [
  { value: "sea", label: "Sea freight", factor: 0.016 / 1000 },
  { value: "rail", label: "Rail", factor: 0.03 / 1000 },
  { value: "road", label: "Truck / Road", factor: 0.12 / 1000 },
  { value: "air", label: "Air freight", factor: 0.6 / 1000 },
]

const CAR_KG_PER_KM = 0.192 // for a relatable comparison

const empty = {
  category: "clothing",
  material: "cotton",
  weight: "",
  packaging: "standard",
  distance: "",
  transport: "sea",
}

export default function CarbonCalculator() {
  const [form, setForm] = useState(empty)
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const compute = () => {
    const weight = parseFloat(form.weight) || 0
    const distance = parseFloat(form.distance) || 0
    const mat = MATERIALS.find((m) => m.value === form.material) || MATERIALS[MATERIALS.length - 1]
    const pack = PACKAGING.find((p) => p.value === form.packaging) || PACKAGING[2]
    const trans = TRANSPORT.find((t) => t.value === form.transport) || TRANSPORT[0]
    const catFactor = CATEGORY_FACTORS[form.category] ?? 1

    const materialKg = weight * mat.factor * catFactor
    const packagingKg = pack.factor
    const transportKg = weight * distance * trans.factor

    const totalKg = materialKg + packagingKg + transportKg
    setResult({
      totalKg,
      carKm: CAR_KG_PER_KM > 0 ? totalKg / CAR_KG_PER_KM : 0,
      breakdown: [
        { label: "Materials & manufacturing", value: materialKg, icon: Factory },
        { label: "Packaging", value: packagingKg, icon: Package },
        { label: "Transportation", value: transportKg, icon: Truck },
      ],
    })
  }

  const canEstimate = useMemo(() => parseFloat(form.weight) > 0, [form.weight])

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <motion.div initial={fadeInUp.initial} animate={fadeInUp.animate} transition={fadeInUp.transition} className="text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Calculator className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold">Product Carbon Footprint Estimator</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate the CO₂e of a product from its category, material, weight, packaging, and how far it travels to reach you.
        </p>
      </motion.div>

      <Card className="mt-8 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label className="flex items-center gap-1.5"><Shirt className="h-4 w-4" /> Product Category</Label>
            <select
              value={form.category}
              onChange={set("category")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="flex items-center gap-1.5"><Layers className="h-4 w-4" /> Material</Label>
            <select
              value={form.material}
              onChange={set("material")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {MATERIALS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="flex items-center gap-1.5"><Scale className="h-4 w-4" /> Weight (kg)</Label>
            <Input type="number" min="0" step="0.01" value={form.weight} onChange={set("weight")} placeholder="e.g. 0.3" />
          </div>
          <div>
            <Label className="flex items-center gap-1.5"><Package className="h-4 w-4" /> Packaging</Label>
            <select
              value={form.packaging}
              onChange={set("packaging")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {PACKAGING.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="flex items-center gap-1.5"><Truck className="h-4 w-4" /> Transportation Distance (km)</Label>
            <Input type="number" min="0" value={form.distance} onChange={set("distance")} placeholder="e.g. 8000" />
          </div>
          <div>
            <Label className="flex items-center gap-1.5"><Truck className="h-4 w-4" /> Transport Method</Label>
            <select
              value={form.transport}
              onChange={set("transport")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {TRANSPORT.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={compute} disabled={!canEstimate} className="flex-1">
            <Calculator className="h-4 w-4" /> Estimate
          </Button>
          {result && (
            <Button variant="outline" onClick={() => { setForm(empty); setResult(null) }}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          )}
        </div>
        {!canEstimate && (
          <p className="mt-3 text-center text-xs text-muted-foreground">Enter a product weight to estimate its footprint.</p>
        )}
      </Card>

      {result && (
        <motion.div initial={fadeInUp.initial} animate={fadeInUp.animate} transition={fadeInUp.transition}>
          <Card className="mt-6 p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Estimated footprint of this product</p>
              <p className="mt-1 font-serif text-4xl font-bold text-primary">
                {result.totalKg.toFixed(2)} kg CO₂e
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                ≈ the same as driving {Math.round(result.carKm).toLocaleString()} km in an average car
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {result.breakdown.map((b) => {
                const Icon = b.icon
                const pct = result.totalKg > 0 ? (b.value / result.totalKg) * 100 : 0
                return (
                  <div key={b.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5"><Icon className="h-4 w-4 text-muted-foreground" /> {b.label}</span>
                      <span className="text-muted-foreground">{b.value.toFixed(2)} kg</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 rounded-xl bg-primary/5 p-4 text-center">
              <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary">
                <Leaf className="h-4 w-4" /> Choosing recycled materials and lower-impact shipping cuts this footprint.
              </p>
              <Link to="/products" className="mt-3 inline-block">
                <Button>
                  <ShoppingBag className="h-4 w-4" /> Shop low-impact products
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Estimates are simplified and for educational purposes only.
      </p>
    </div>
  )
}
