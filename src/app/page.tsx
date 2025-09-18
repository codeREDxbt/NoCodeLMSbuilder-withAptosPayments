import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Coins, Palette, Users, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NoCode LMS</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/courses" className="text-gray-500 hover:text-gray-900">Courses</Link>
              <Link href="/builder" className="text-gray-500 hover:text-gray-900">Course Builder</Link>
              <Link href="/pricing" className="text-gray-500 hover:text-gray-900">Pricing</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build & Sell Courses with 
            <span className="text-indigo-600"> Aptos Payments</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional online courses with our drag-and-drop builder. 
            Accept payments in APT cryptocurrency on the secure Aptos blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto">
                <Palette className="mr-2 h-5 w-5" />
                Start Building
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to create and sell courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines the best of no-code course creation with the power of blockchain payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Palette className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Drag & Drop Builder</CardTitle>
                <CardDescription>
                  Create stunning courses with our visual editor. No coding required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Video lessons</li>
                  <li>• Interactive quizzes</li>
                  <li>• Rich text content</li>
                  <li>• File downloads</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Coins className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Aptos Payments</CardTitle>
                <CardDescription>
                  Accept APT cryptocurrency payments with instant settlement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Fast transactions</li>
                  <li>• Low fees</li>
                  <li>• Secure blockchain</li>
                  <li>• Global payments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  Track progress, manage enrollments, and engage with students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Progress tracking</li>
                  <li>• Completion certificates</li>
                  <li>• Discussion forums</li>
                  <li>• Analytics dashboard</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Built with modern tech for speed and reliability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js frontend</li>
                  <li>• Optimized performance</li>
                  <li>• Mobile responsive</li>
                  <li>• PWA support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with blockchain transparency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Smart contract payments</li>
                  <li>• Data encryption</li>
                  <li>• Regular backups</li>
                  <li>• 99.9% uptime</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Course Templates</CardTitle>
                <CardDescription>
                  Start with pre-built templates or create from scratch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Industry templates</li>
                  <li>• Custom branding</li>
                  <li>• Reusable components</li>
                  <li>• Export/import</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start creating?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of instructors who are already building and selling courses with our platform.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary">
              Create Your First Course
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-lg font-semibold text-white">NoCode LMS</span>
              </div>
              <p className="text-sm">
                Build and sell online courses with drag-and-drop simplicity and Aptos blockchain payments.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="/integrations" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm">
              © 2025 NoCode LMS Builder. All rights reserved. Built with ❤️ for educators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}