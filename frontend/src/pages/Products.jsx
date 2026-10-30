import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { SlidersHorizontal, Search as SearchIcon, Loader2 } from "lucide-react"
import { Product, WishlistItem } from "@/api/client"
import { useAuth } from "@/lib/AuthContext"
import { roleFlags, CATEGORIES } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/shared/ProductCard"

// How many products to load per page / per "Load more" click.
const PAGE_SIZE = 48

const sortOptions = [
  { value: "-created_date", label: "Newest" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-sustainability_score", label: "Most Sustainable" },
  { value: "-orders_count", label: "Most Popular" },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()
  const { isCustomer } = roleFlags(user)

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const category = searchParams.get("category") || "all"
  const [sort, setSort] = useState("-created_date")
  const [limit, setLimit] = useState(PAGE_SIZE)

  useEffect(() => {
    setSearch(searchParams.get("search") || "")
  }, [searchParams])

  // Reset paging whenever the filters change so we start from the top.
  useEffect(() => {
    setLimit(PAGE_SIZE)
  }, [category, sort])

  const { data: products = [], isLoading, isFetching } = useQuery({
    queryKey: ["products", category, sort, limit],
    queryFn: () => {
      const query = { status: "active" }
      if (category !== "all") query.category = category
      return Product.filter(query, sort, limit)
    },
    placeholderData: keepPreviousData,
  })

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => WishlistItem.list(),
    enabled: isCustomer,
  })
  const wishlistIds = wishlist.map((w) => w.product_id)

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  )

  // If the server returned a full page, there are probably more to load.
  const canLoadMore = products.length >= limit

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value === "all") next.delete("category")
    else next.set("category", value)
    setSearchParams(next)
  }

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...CATEGORIES.map((c) => ({ value: c.value, label: `${c.emoji} ${c.label}` })),
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 font-serif text-3xl font-bold">Shop Products</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory} options={categoryOptions} icon={SlidersHorizontal} className="sm:w-52" />
        <Select value={sort} onValueChange={setSort} options={sortOptions} className="sm:w-52" />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No products found. Try adjusting your filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} wishlistIds={wishlistIds} />
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
            {search ? " (filtered from loaded items)" : ""}
          </p>

          {canLoadMore && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setLimit((l) => l + PAGE_SIZE)}
                disabled={isFetching}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-sm transition hover:bg-secondary disabled:opacity-60"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                  </>
                ) : (
                  "Load more products"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
