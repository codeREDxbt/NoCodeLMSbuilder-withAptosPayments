import { WalletConnection } from '@/components/wallet/wallet-connection'
import { CourseEnrollment } from '@/components/course/course-enrollment'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, BookOpen } from 'lucide-react'

// Sample course data
const sampleCourse = {
  id: "1",
  title: "Introduction to Blockchain Development",
  description: "Learn the fundamentals of blockchain technology and smart contract development on Aptos.",
  price: 0.1, // 0.1 APT
  instructor: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Sample instructor address
  aptosContractAddress: undefined, // Will use simple transfer for demo
  aptosCourseId: "1",
  duration: 240, // 4 hours
  level: "Beginner",
  students: 1250,
  rating: 4.8,
  lessons: [
    "What is Blockchain?",
    "Understanding Aptos",
    "Move Programming Language Basics",
    "Writing Your First Smart Contract",
    "Deploying to Testnet"
  ]
}

export default function CoursePage() {
  const handleEnrollmentSuccess = (transactionHash: string) => {
    console.log('Enrollment successful! Transaction:', transactionHash)
    // Here you would typically update the UI, redirect to course content, etc.
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{sampleCourse.title}</CardTitle>
                    <CardDescription className="text-base">
                      {sampleCourse.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{sampleCourse.level}</Badge>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(sampleCourse.duration / 60)}h {sampleCourse.duration % 60}m</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{sampleCourse.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{sampleCourse.rating}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Course Content</span>
                </CardTitle>
                <CardDescription>
                  {sampleCourse.lessons.length} lessons in this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleCourse.lessons.map((lesson, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{lesson}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                    <span>Understand the fundamentals of blockchain technology</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                    <span>Learn the Move programming language</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                    <span>Build and deploy smart contracts on Aptos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                    <span>Interact with the Aptos blockchain using TypeScript</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Connection */}
            <WalletConnection />

            {/* Course Enrollment */}
            <CourseEnrollment 
              course={sampleCourse}
              onEnrollmentSuccess={handleEnrollmentSuccess}
            />

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Students</span>
                  <span className="font-medium">{sampleCourse.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Rating</span>
                  <span className="font-medium">{sampleCourse.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duration</span>
                  <span className="font-medium">
                    {Math.floor(sampleCourse.duration / 60)}h {sampleCourse.duration % 60}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Level</span>
                  <span className="font-medium">{sampleCourse.level}</span>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white font-semibold text-lg">
                    BC
                  </div>
                  <div>
                    <h4 className="font-semibold">Blockchain Expert</h4>
                    <p className="text-sm text-muted-foreground">Senior Developer & Instructor</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {sampleCourse.instructor.slice(0, 10)}...{sampleCourse.instructor.slice(-10)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}