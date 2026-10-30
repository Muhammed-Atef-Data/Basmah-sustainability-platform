import { useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/AuthContext"
import { roleFlags } from "@/lib/utils"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function AppLayout() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { isNewUser } = roleFlags(user)
  const publicPaths = ["/learn", "/calculator"]

  useEffect(() => {
    if (isAuthenticated && isNewUser && !publicPaths.includes(location.pathname) && location.pathname !== "/setup-profile") {
      navigate("/setup-profile", { replace: true })
    }
  }, [isAuthenticated, isNewUser, location.pathname, navigate])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
