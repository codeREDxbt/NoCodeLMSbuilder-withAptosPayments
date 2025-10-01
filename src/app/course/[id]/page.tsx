'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AptosPayment from '@/components/aptos/aptos-payment'
import {
  BookOpen,
  Star,
  Users,
  Clock,
  CheckCircle,
  ArrowLeft,
  ShoppingCart,
  Play,
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  price: number
  currency: string
  students: number
  lessons: number
  duration: string
  rating: number
  instructor: string
  category: string
  level: string
}

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    const courseId = params.id as string
    const mockCourses: { [key: string]: Course } = {
      '1': {
        id: '1',
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch.',
        price: 99.99,
        currency: 'APT',
        students: 1247,
        lessons: 45,
        duration: '40 hours',
        rating: 4.8,
        instructor: 'John Doe',
        category: 'Development',
        level: 'Beginner',
      },
      '2': {
        id: '2',
        title: 'Blockchain Fundamentals with Aptos',
        description: 'Understanding cryptocurrency and the Aptos ecosystem.',
        price: 149.99,
        currency: 'APT',
        students: 892,
        lessons: 32,
        duration: '25 hours',
        rating: 4.9,
        instructor: 'Sarah Johnson',
        category: 'Blockchain',
        level: 'Intermediate',
      },
    }

    const selectedCourse = mockCourses[courseId] || mockCourses['1']
    setCourse(selectedCourse)
    setLoading(false)
  }, [params.id])

  const enrollInCourse = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = (transactionHash: string) => {
    console.log('Payment successful:', transactionHash)
    // Here you would typically update the enrollment status
    alert(`Enrollment successful! Transaction: ${transactionHash.slice(0, 10)}...`)
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error)
    alert(`Payment failed: ${error}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Course not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-3 text-2xl font-bold text-gray-900">NoCodeLMS</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>

            <div className="flex items-center mb-6 space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="ml-1 font-bold text-gray-800">{course.rating}</span>
                <span className="ml-1 text-sm text-gray-500">(1,280 ratings)</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="ml-1 text-sm text-gray-800">{course.students} students</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>What you'll learn</h2>
              <ul>
                <li>Build amazing single-page applications with React and Next.js.</li>
                <li>Master fundamental concepts in blockchain and the Aptos ecosystem.</li>
                <li>Create and deploy smart contracts on the Aptos network.</li>
                <li>Learn to build secure and scalable web applications.</li>
              </ul>
            </div>
          </div>

          <div>
            {!showPayment ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">${course.price} <span className="text-sm font-normal">{course.currency}</span></CardTitle>
                  <CardDescription>Lifetime access to this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full" onClick={enrollInCourse}>
                    Enroll Now
                  </Button>
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-bold mb-2">This course includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center"><Clock className="w-4 h-4 mr-2" />{course.duration} on-demand video</li>
                      <li className="flex items-center"><BookOpen className="w-4 h-4 mr-2" />{course.lessons} articles & resources</li>
                      <li className="flex items-center"><Play className="w-4 h-4 mr-2" />Access on mobile and TV</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" />Certificate of completion</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <AptosPayment
                courseId={course.id}
                courseTitle={course.title}
                price={course.price}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}