'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Search, 
  Filter, 
  Star, 
  Users, 
  Clock, 
  Play,
  ShoppingCart
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
  thumbnail: string
  published: boolean
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  useEffect(() => {
    // Mock courses data
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and deploy them to production.',
        price: 99.99,
        currency: 'APT',
        students: 1247,
        lessons: 45,
        duration: '40 hours',
        rating: 4.8,
        instructor: 'John Doe',
        category: 'Development',
        level: 'Beginner',
        thumbnail: '/api/placeholder/400/225',
        published: true
      },
      {
        id: '2',
        title: 'Blockchain Fundamentals with Aptos',
        description: 'Understanding cryptocurrency, DeFi, smart contracts, and the Aptos ecosystem. Perfect for beginners.',
        price: 149.99,
        currency: 'APT',
        students: 892,
        lessons: 32,
        duration: '25 hours',
        rating: 4.9,
        instructor: 'Sarah Johnson',
        category: 'Blockchain',
        level: 'Intermediate',
        thumbnail: '/api/placeholder/400/225',
        published: true
      },
      {
        id: '3',
        title: 'UI/UX Design Masterclass',
        description: 'Create beautiful and user-friendly interfaces using Figma, Adobe XD, and design principles.',
        price: 79.99,
        currency: 'APT',
        students: 634,
        lessons: 28,
        duration: '18 hours',
        rating: 4.7,
        instructor: 'Mike Chen',
        category: 'Design',
        level: 'Intermediate',
        thumbnail: '/api/placeholder/400/225',
        published: true
      },
      {
        id: '4',
        title: 'Digital Marketing Strategy',
        description: 'Master social media marketing, SEO, content marketing, and paid advertising strategies.',
        price: 59.99,
        currency: 'APT',
        students: 423,
        lessons: 22,
        duration: '15 hours',
        rating: 4.6,
        instructor: 'Emily Rodriguez',
        category: 'Marketing',
        level: 'Beginner',
        thumbnail: '/api/placeholder/400/225',
        published: true
      },
      {
        id: '5',
        title: 'Data Science with Python',
        description: 'Learn data analysis, machine learning, and visualization using Python, pandas, and scikit-learn.',
        price: 129.99,
        currency: 'APT',
        students: 789,
        lessons: 38,
        duration: '35 hours',
        rating: 4.8,
        instructor: 'Dr. Alex Wang',
        category: 'Data Science',
        level: 'Advanced',
        thumbnail: '/api/placeholder/400/225',
        published: true
      },
      {
        id: '6',
        title: 'Mobile App Development',
        description: 'Build iOS and Android apps using React Native. Deploy to app stores and monetize your apps.',
        price: 119.99,
        currency: 'APT',
        students: 567,
        lessons: 42,
        duration: '30 hours',
        rating: 4.7,
        instructor: 'Lisa Park',
        category: 'Development',
        level: 'Intermediate',
        thumbnail: '/api/placeholder/400/225',
        published: true
      }
    ]

    setCourses(mockCourses)
  }, [])

  const categories = ['all', 'Development', 'Blockchain', 'Design', 'Marketing', 'Data Science']
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel && course.published
  })

  const enrollInCourse = (courseId: string) => {
    alert(`Enrolling in course ${courseId}. Redirecting to payment...`)
    // Here you would integrate with Aptos wallet for payment
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
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/courses" className="text-indigo-600 font-medium">Courses</Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
          <p className="text-gray-600">Discover courses to advance your skills</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={`https://via.placeholder.com/400x225/4f46e5/ffffff?text=${encodeURIComponent(course.title)}`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                    {course.level}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  by {course.instructor}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Play className="h-4 w-4 mr-1" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-indigo-600">
                    {course.price} {course.currency}
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/course/${course.id}`}>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      onClick={() => enrollInCourse(course.id)}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Enroll
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedLevel('all')
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}