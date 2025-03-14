"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { loginUser } from "../../../store/authSlice"
import type { AppDispatch } from "../../../store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Loader2, Lock, Mail, HospitalIcon as Medical } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"

export function SignInForm() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await dispatch(loginUser(formData)).unwrap()
      if (response.success) {
        router.push("/admin/dashboard")
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please check your credentials.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all dark:border-slate-800 dark:bg-slate-950">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-teal-400 p-8 dark:from-blue-600 dark:to-teal-500">
          <div className="absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -left-10 -bottom-10 z-0 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Medical className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Layan Medical</h1>
              <p className="text-sm text-white/80">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-slate-100">Welcome back</h2>
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">Sign in to access the admin dashboard</p>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  placeholder="your.email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Button variant="link" className="h-auto p-0 text-xs text-blue-600 dark:text-blue-400" type="button">
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Remember me for 30 days
              </Label>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 dark:from-blue-700 dark:to-teal-600 dark:hover:from-blue-800 dark:hover:to-teal-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

