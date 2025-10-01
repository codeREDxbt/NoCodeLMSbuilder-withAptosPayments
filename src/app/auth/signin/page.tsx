'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Demo user accounts
  const demoUsers = [
    {
      id: '1',
      email: 'instructor@demo.com',
      password: 'demo123',
      name: 'John Doe',
      role: 'instructor',
      title: 'Senior Full Stack Developer',
      description: 'Experienced instructor with 5+ years in web development'
    },
    {
      id: '2',
      email: 'student@demo.com',
      password: 'demo123',
      name: 'Jane Smith',
      role: 'student',
      title: 'Aspiring Developer',
      description: 'Passionate learner eager to master new technologies'
    },
    {
      id: '3',
      email: 'admin@demo.com',
      password: 'demo123',
      name: 'Admin User',
      role: 'admin',
      title: 'Platform Administrator',
      description: 'Platform admin with full system access'
    }
  ]

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check demo users first
      const demoUser = demoUsers.find(user => 
        user.email === email && user.password === password
      )

      if (demoUser) {
        // Store user session
        localStorage.setItem('user', JSON.stringify({
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role,
          title: demoUser.title,
          description: demoUser.description
        }))

        alert(`Welcome back, ${demoUser.name}! You have successfully signed in as ${demoUser.role}.`)
        router.push('/dashboard')
      } else if (email && password) {
        // Fallback for any custom login
        localStorage.setItem('user', JSON.stringify({
          id: '999',
          email,
          name: email.split('@')[0],
          role: 'instructor',
          title: 'Course Creator',
          description: 'Welcome to NoCode LMS'
        }))

        alert('Welcome! You have successfully signed in.')
        router.push('/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      alert('Error: Invalid credentials. Please try a demo account or check your login details.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoUser: typeof demoUsers[0]) => {
    setIsLoading(true)
    setEmail(demoUser.email)
    setPassword(demoUser.password)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store user session
      localStorage.setItem('user', JSON.stringify({
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
        title: demoUser.title,
        description: demoUser.description
      }))

      alert(`Welcome, ${demoUser.name}! Logged in as ${demoUser.role}.`)
      router.push('/dashboard')
    } catch (error) {
      alert('Demo login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">NoCode LMS</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue building courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Login Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Quick Demo Login</h3>
              <div className="grid grid-cols-1 gap-2">
                {demoUsers.map((user) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(user)}
                    disabled={isLoading}
                    className="justify-start text-left"
                  >
                    <div className="flex items-center w-full">
                      <div className="flex-1">
                        <div className="font-medium text-xs">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.role} • {user.email}
                        </div>
                      </div>
                      {user.role === 'instructor' && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">👨‍🏫</span>
                      )}
                      {user.role === 'student' && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">👩‍🎓</span>
                      )}
                      {user.role === 'admin' && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">👑</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with credentials</span>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link href="/auth/forgot-password" className="text-indigo-600 hover:underline">
                Forgot your password?
              </Link>
            </div>

            {/* Demo Credentials Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-xs font-semibold text-blue-800 mb-2">Demo Credentials</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Instructor:</strong> instructor@demo.com / demo123</div>
                <div><strong>Student:</strong> student@demo.com / demo123</div>
                <div><strong>Admin:</strong> admin@demo.com / demo123</div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}