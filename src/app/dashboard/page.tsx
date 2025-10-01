'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Plus, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Play, 
  Edit, 
  Trash2,
  MoreVertical,
  Star,
  Eye
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
  title?: string
  description?: string
}

interface Course {
  id: string
  title: string
  description: string
  price: number
  currency: string
  students: number
  lessons: number
  rating: number
  published: boolean
  thumbnail: string
  earnings: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    avgRating: 0
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/signin')
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Mock data for courses
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch',
        price: 99.99,
        currency: 'APT',
        students: 1247,
        lessons: 45,
        rating: 4.8,
        published: true,
        thumbnail: '/api/placeholder/300/200',
        earnings: 124700
      },
      {
        id: '2',
        title: 'Blockchain Fundamentals',
        description: 'Understanding cryptocurrency, DeFi, and smart contracts',
        price: 149.99,
        currency: 'APT',
        students: 892,
        lessons: 32,
        rating: 4.9,
        published: true,
        thumbnail: '/api/placeholder/300/200',
        earnings: 133780
      },
      {
        id: '3',
        title: 'UI/UX Design Masterclass',
        description: 'Create beautiful and user-friendly interfaces',
        price: 79.99,
        currency: 'APT',
        students: 0,
        lessons: 28,
        rating: 0,
        published: false,
        thumbnail: '/api/placeholder/300/200',
        earnings: 0
      }
    ]

    setCourses(mockCourses)

    // Calculate stats
    const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0)
    const totalEarnings = mockCourses.reduce((sum, course) => sum + course.earnings, 0)
    const publishedCourses = mockCourses.filter(course => course.published)
    const avgRating = publishedCourses.reduce((sum, course) => sum + course.rating, 0) / publishedCourses.length

    setStats({
      totalCourses: mockCourses.length,
      totalStudents,
      totalEarnings,
      avgRating: avgRating || 0
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const deleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== courseId))
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NoCode LMS</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user.name} 
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {user.role}
                  </span>
                </div>
                {user.title && (
                  <div className="text-xs text-gray-600">{user.title}</div>
                )}
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {user.role === 'instructor' && 'Instructor Dashboard'}
            {user.role === 'student' && 'Learning Dashboard'}
            {user.role === 'admin' && 'Admin Dashboard'}
            {!['instructor', 'student', 'admin'].includes(user.role) && 'Dashboard'}
          </h1>
          <p className="text-gray-600">
            {user.role === 'instructor' && 'Manage your courses and track your teaching progress'}
            {user.role === 'student' && 'Track your learning progress and discover new courses'}
            {user.role === 'admin' && 'Manage platform users, courses, and system settings'}
            {!['instructor', 'student', 'admin'].includes(user.role) && 'Manage your courses and track your progress'}
          </p>
          {user.description && (
            <p className="text-sm text-indigo-600 mt-1">{user.description}</p>
          )}
        </div>

        {/* Demo User Notice */}
        {user.role && ['instructor', 'student', 'admin'].includes(user.role) && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {user.role === 'instructor' && <span className="text-2xl">👨‍🏫</span>}
                {user.role === 'student' && <span className="text-2xl">👩‍🎓</span>}
                {user.role === 'admin' && <span className="text-2xl">👑</span>}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-blue-800">
                  Demo Mode - {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  {user.role === 'instructor' && 'You are viewing the instructor dashboard with sample courses and analytics. Create and manage courses, track student progress, and view earnings.'}
                  {user.role === 'student' && 'You are viewing the student dashboard. Explore available courses, track your learning progress, and manage your enrollments.'}
                  {user.role === 'admin' && 'You are viewing the admin dashboard with platform management capabilities. Monitor users, courses, and system performance.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'student' ? 'Enrolled Courses' : 
                     user.role === 'admin' ? 'Platform Courses' : 'Total Courses'}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'student' ? 'Learning Hours' :
                     user.role === 'admin' ? 'Platform Users' : 'Total Students'}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {user.role === 'student' ? '156h' : stats.totalStudents.toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'student' ? 'Certificates' :
                     user.role === 'admin' ? 'Revenue' : 'Total Earnings'}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {user.role === 'student' ? '8' : `${stats.totalEarnings.toLocaleString()} APT`}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {user.role === 'student' ? 'Completion Rate' :
                     user.role === 'admin' ? 'Platform Rating' : 'Avg Rating'}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {user.role === 'student' ? '87%' : stats.avgRating.toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.role === 'student' ? 'Your Enrolled Courses' :
             user.role === 'admin' ? 'Platform Courses' : 'Your Courses'}
          </h2>
          {user.role !== 'student' && (
            <Link href="/builder">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {user.role === 'admin' ? 'Add Course' : 'Create New Course'}
              </Button>
            </Link>
          )}
          {user.role === 'student' && (
            <Link href="/courses">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Browse Courses
              </Button>
            </Link>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={`https://via.placeholder.com/400x225/4f46e5/ffffff?text=${encodeURIComponent(course.title)}`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={course.published ? "default" : "secondary"}>
                    {course.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{course.lessons} lessons</span>
                    <span className="font-semibold">{course.price} {course.currency}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students} students</span>
                    </div>
                    {course.rating > 0 && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Link href={`/course/${course.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/builder?courseId=${course.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteCourse(course.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-4">Start building your first course to see it here</p>
              <Link href="/builder">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}