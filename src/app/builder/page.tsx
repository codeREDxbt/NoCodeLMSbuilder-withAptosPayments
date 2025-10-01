'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  ArrowLeft,
  Upload,
  Play,
  Settings,
  DollarSign,
  Users,
  Clock,
  GripVertical
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  content: string
  duration: string
  videoUrl?: string
  order: number
}

interface Course {
  id?: string
  title: string
  description: string
  category: string
  level: string
  price: number
  currency: string
  thumbnail?: string
  lessons: Lesson[]
  published: boolean
}

export default function CourseBuilderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get('courseId')
  
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    category: 'Development',
    level: 'Beginner',
    price: 0,
    currency: 'APT',
    lessons: [],
    published: false
  })
  
  const [activeTab, setActiveTab] = useState('basic')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // If editing an existing course, load its data
    if (courseId) {
      // Mock data for demonstration
      const mockCourse: Course = {
        id: courseId,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch.',
        category: 'Development',
        level: 'Beginner',
        price: 99.99,
        currency: 'APT',
        lessons: [
          {
            id: '1',
            title: 'Introduction to Web Development',
            content: 'Welcome to the course! In this lesson, we will cover...',
            duration: '15:30',
            order: 1
          },
          {
            id: '2',
            title: 'HTML Basics',
            content: 'HTML is the foundation of web development...',
            duration: '22:45',
            order: 2
          }
        ],
        published: false
      }
      setCourse(mockCourse)
    }
  }, [courseId])

  const addLesson = () => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: `Lesson ${course.lessons.length + 1}`,
      content: '',
      duration: '10:00',
      order: course.lessons.length + 1
    }
    
    setCourse(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson]
    }))
  }

  const updateLesson = (lessonId: string, updates: Partial<Lesson>) => {
    setCourse(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson => 
        lesson.id === lessonId ? { ...lesson, ...updates } : lesson
      )
    }))
  }

  const deleteLesson = (lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      setCourse(prev => ({
        ...prev,
        lessons: prev.lessons.filter(lesson => lesson.id !== lessonId)
      }))
    }
  }

  const saveCourse = async () => {
    setSaving(true)
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('Course saved successfully!')
    } catch (error) {
      alert('Error saving course. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const publishCourse = async () => {
    if (!course.title || !course.description || course.lessons.length === 0) {
      alert('Please complete all required fields and add at least one lesson before publishing.')
      return
    }
    
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setCourse(prev => ({ ...prev, published: true }))
      alert('Course published successfully!')
    } catch (error) {
      alert('Error publishing course. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const previewCourse = () => {
    if (course.id) {
      window.open(`/course/${course.id}`, '_blank')
    } else {
      alert('Please save the course first to preview it.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Course Builder</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={previewCourse}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" onClick={saveCourse} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button onClick={publishCourse} disabled={saving}>
                {course.published ? 'Update Course' : 'Publish Course'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Set up the basic details for your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Course Title *</Label>
                      <Input
                        id="title"
                        value={course.title}
                        onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter your course title"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={course.description}
                        onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what students will learn"
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={course.category}
                          onChange={(e) => setCourse(prev => ({ ...prev, category: e.target.value }))}
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Development">Development</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Business">Business</option>
                          <option value="Blockchain">Blockchain</option>
                          <option value="Data Science">Data Science</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <select
                          id="level"
                          value={course.level}
                          onChange={(e) => setCourse(prev => ({ ...prev, level: e.target.value }))}
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Course Thumbnail</Label>
                      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lessons" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <div>
                      <CardTitle>Course Lessons</CardTitle>
                      <CardDescription>
                        Add and organize your course content
                      </CardDescription>
                    </div>
                    <Button onClick={addLesson}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {course.lessons.length === 0 ? (
                      <div className="text-center py-12">
                        <Play className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No lessons yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding your first lesson</p>
                        <Button onClick={addLesson} className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Add First Lesson
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {course.lessons.map((lesson, index) => (
                          <Card key={lesson.id} className="border">
                            <CardHeader className="pb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <GripVertical className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <Input
                                      value={lesson.title}
                                      onChange={(e) => updateLesson(lesson.id, { title: e.target.value })}
                                      className="font-medium"
                                      placeholder="Lesson title"
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(lesson.id, { duration: e.target.value })}
                                    placeholder="Duration"
                                    className="w-20"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteLesson(lesson.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <Textarea
                                value={lesson.content}
                                onChange={(e) => updateLesson(lesson.id, { content: e.target.value })}
                                placeholder="Lesson content and description"
                                rows={3}
                              />
                              <div className="mt-4">
                                <Label>Video Upload</Label>
                                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                  <p className="mt-1 text-sm text-gray-600">Upload lesson video</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Payment</CardTitle>
                    <CardDescription>
                      Set your course price and payment options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={course.price}
                          onChange={(e) => setCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <select
                          id="currency"
                          value={course.currency}
                          onChange={(e) => setCourse(prev => ({ ...prev, currency: e.target.value }))}
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="APT">APT (Aptos)</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" />
                        <div>
                          <h3 className="text-sm font-semibold text-indigo-900">Aptos Payment Integration</h3>
                          <p className="text-sm text-indigo-700 mt-1">
                            Your course will use Aptos blockchain for secure, fast payments. 
                            Students can pay with APT tokens directly from their Aptos wallet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Settings</CardTitle>
                    <CardDescription>
                      Additional settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Course Status</Label>
                        <p className="text-sm text-gray-600">
                          {course.published ? 'Published and visible to students' : 'Draft - only visible to you'}
                        </p>
                      </div>
                      <Badge variant={course.published ? 'default' : 'secondary'}>
                        {course.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    
                    <div className="border-t pt-4">
                      <Label className="text-base font-medium">Danger Zone</Label>
                      <div className="mt-2 space-y-2">
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          Unpublish Course
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          Delete Course
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                    <img 
                      src={`https://via.placeholder.com/300x169/4f46e5/ffffff?text=${encodeURIComponent(course.title || 'Course Title')}`}
                      alt="Course thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {course.title || 'Course Title'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {course.description || 'Course description will appear here...'}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{course.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lessons:</span>
                      <span>{course.lessons.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span>{course.price} {course.currency}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">0 students enrolled</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">
                        {course.lessons.reduce((total, lesson) => {
                          const [minutes] = lesson.duration.split(':').map(Number)
                          return total + (minutes || 0)
                        }, 0)} minutes total
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">$0 total earnings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}