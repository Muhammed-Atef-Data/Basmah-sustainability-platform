import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Leaf,
  Recycle,
  TrendingDown,
  Droplets,
  Factory,
  ArrowRight,
  Calculator,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react"
import { fadeInUp, fadeIn } from "@/lib/motion"
import { Button } from "@/components/ui/button"

const viewportOnce = { once: true }

const stats = [
  { icon: Factory, value: "~36B", label: "tonnes of CO₂ emitted globally each year" },
  { icon: Droplets, value: "2,700 L", label: "of water to make one cotton t-shirt" },
  { icon: Recycle, value: "<9%", label: "of all plastic ever made has been recycled" },
  { icon: TrendingDown, value: "1.5°C", label: "warming limit we must stay under" },
]

const standards = [
  {
    emoji: "🌿",
    title: "Organic & Natural",
    text: "Made from non-toxic, certified organic ingredients that protect your health and the soil.",
  },
  {
    emoji: "📦",
    title: "Zero-Waste & Plastic-Free",
    text: "Features packaging that is 100% compostable, biodegradable, or easily recyclable.",
  },
  {
    emoji: "🐰",
    title: "Cruelty-Free & Vegan",
    text: "Strictly 100% plant-based products, with absolutely zero animal testing involved.",
  },
  {
    emoji: "🤝",
    title: "Ethically Sourced",
    text: "Created by independent artisans and brands who guarantee fair wages and safe working conditions.",
  },
]

export default function Learn() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <motion.div initial={fadeInUp.initial} animate={fadeInUp.animate} transition={fadeInUp.transition}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" /> Why it matters
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Small choices, a healthier planet
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Climate change isn't only governments' and corporations' job — the way each of us shops adds up.
              Here's why choosing sustainable products matters, and how we can all help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={fadeInUp.initial}
                whileInView={fadeInUp.animate}
                viewport={viewportOnce}
                transition={fadeInUp.transition}
                className="rounded-xl border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-serif text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Section 3: Our Eco-Badges / Standards */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" /> Our Standards
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold">How We Vet Our Products</h2>
          <p className="mt-3 text-muted-foreground">
            We don't believe in greenwashing. Every item on Basmah meets strict environmental standards.
            Look for these badges while shopping our marketplace:
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((s) => (
            <motion.div
              key={s.title}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={viewportOnce}
              transition={fadeInUp.transition}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                {s.emoji}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How everyone can help */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.animate}
          viewport={viewportOnce}
          transition={fadeIn.transition}
          className="rounded-2xl border bg-primary/5 p-8"
        >
          <h2 className="font-serif text-2xl font-bold">How we can all help</h2>
          <ul className="mt-5 space-y-3 text-muted-foreground">
            {[
              "Choose products with high sustainability scores and clear material transparency.",
              "Prefer recycled and recyclable items — look for the recycled-content badge.",
              "Buy less, buy better: pick durable products with a long lifecycle.",
              "Check the Environmental Impact Report before you buy.",
              "Support verified sustainable companies over fast, disposable alternatives.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-8 text-center">
          <h2 className="font-serif text-2xl font-bold">Ready to make a difference?</h2>
          <p className="max-w-xl text-muted-foreground">
            Calculate your own carbon footprint, then start shopping products that help you bring it down.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/calculator">
              <Button size="lg" variant="outline">
                <Calculator className="h-4 w-4" /> Carbon Calculator
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg">
                <ShoppingBag className="h-4 w-4" /> Start Shopping <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
