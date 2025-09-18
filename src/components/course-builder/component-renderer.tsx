"use client"

import { CourseComponent } from '@/types/course-builder'
import { useCourseBuilder } from '@/stores/course-builder'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Edit, 
  Trash2, 
  Copy, 
  GripVertical,
  Play,
  Download,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { cn } from '@/lib/utils'

interface ComponentRendererProps {
  component: CourseComponent
  isSelected: boolean
  isPreview?: boolean
}

export function ComponentRenderer({ component, isSelected, isPreview = false }: ComponentRendererProps) {
  const { updateComponent, deleteComponent, selectComponent, duplicateComponent } = useCourseBuilder()
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)

  const handleSelect = () => {
    if (!isPreview) {
      selectComponent(component.id)
    }
  }

  const handleUpdate = (data: any) => {
    updateComponent(component.id, data)
  }

  const renderComponent = () => {
    const { type, data } = component

    switch (type) {
      case 'text':
        return (
          <div 
            className="prose max-w-none"
            style={{
              backgroundColor: data.backgroundColor,
              color: data.textColor,
              padding: data.padding,
              borderRadius: data.borderRadius
            }}
            dangerouslySetInnerHTML={{ __html: data.content || '' }}
          />
        )

      case 'video':
        return (
          <div style={{ padding: data.padding }}>
            {data.videoUrl ? (
              <ReactPlayer
                url={data.videoUrl}
                controls={data.controls}
                playing={data.autoplay}
                width="100%"
                height="auto"
                className="rounded-lg"
              />
            ) : (
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Play className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Add video URL to display player</p>
              </div>
            )}
          </div>
        )

      case 'image':
        return (
          <div style={{ padding: data.padding }}>
            {data.imageUrl ? (
              <figure>
                <img
                  src={data.imageUrl}
                  alt={data.alt}
                  className="w-full rounded-lg"
                />
                {data.caption && (
                  <figcaption className="text-sm text-gray-600 mt-2 text-center">
                    {data.caption}
                  </figcaption>
                )}
              </figure>
            ) : (
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <img className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Add image URL to display image</p>
              </div>
            )}
          </div>
        )

      case 'quiz':
        return (
          <div style={{ padding: data.padding }}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{data.question}</h3>
              <div className="space-y-2">
                {data.options?.map((option, index) => (
                  <button
                    key={option.id}
                    className={cn(
                      "w-full p-3 text-left border rounded-lg transition-colors",
                      quizAnswer === index && !showQuizResult && "border-primary bg-primary/5",
                      showQuizResult && index === data.correctAnswer && "border-green-500 bg-green-50",
                      showQuizResult && quizAnswer === index && index !== data.correctAnswer && "border-red-500 bg-red-50",
                      !showQuizResult && "hover:bg-gray-50"
                    )}
                    onClick={() => {
                      if (!showQuizResult) {
                        setQuizAnswer(index)
                      }
                    }}
                    disabled={showQuizResult}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {showQuizResult && index === data.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {showQuizResult && quizAnswer === index && index !== data.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {quizAnswer !== null && !showQuizResult && (
                <Button onClick={() => setShowQuizResult(true)}>
                  Submit Answer
                </Button>
              )}
              {showQuizResult && data.explanation && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">{data.explanation}</p>
                </div>
              )}
              {showQuizResult && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizAnswer(null)
                    setShowQuizResult(false)
                  }}
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        )

      case 'file-download':
        return (
          <div style={{ padding: data.padding }}>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-medium">{data.fileName}</h4>
                  <p className="text-sm text-gray-600">{data.fileSize}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
        )

      case 'audio':
        return (
          <div style={{ padding: data.padding }}>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{data.title}</h4>
              {data.audioUrl ? (
                <audio controls className="w-full">
                  <source src={data.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <div className="bg-gray-100 border border-gray-300 rounded p-4 text-center text-gray-600">
                  Add audio URL to display player
                </div>
              )}
            </div>
          </div>
        )

      case 'code':
        return (
          <div style={{ padding: data.padding }}>
            <pre
              className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"
              style={{ backgroundColor: data.backgroundColor }}
            >
              <code className={`language-${data.language}`}>
                {data.code}
              </code>
            </pre>
          </div>
        )

      case 'divider':
        return (
          <div style={{ margin: data.margin }}>
            <hr 
              className="border-0 h-px"
              style={{ backgroundColor: data.backgroundColor }}
            />
          </div>
        )

      case 'spacer':
        return <div style={{ padding: data.padding }} />

      default:
        return <div>Unknown component type</div>
    }
  }

  if (isPreview) {
    return <div>{renderComponent()}</div>
  }

  return (
    <div
      className={cn(
        "relative group border rounded-lg transition-all",
        isSelected ? "border-primary border-2 shadow-lg" : "border-gray-200 hover:border-gray-300"
      )}
      onClick={handleSelect}
    >
      {/* Component actions */}
      {isSelected && (
        <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-white border rounded-md shadow-sm p-1 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation()
              duplicateComponent(component.id)
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation()
              deleteComponent(component.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Component content */}
      <div className="min-h-[40px]">
        {renderComponent()}
      </div>
    </div>
  )
}