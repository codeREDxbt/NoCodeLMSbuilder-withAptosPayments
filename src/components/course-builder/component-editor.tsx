"use client"

import { CourseComponent } from '@/types/course-builder'
import { useCourseBuilder } from '@/stores/course-builder'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface ComponentEditorProps {
  component: CourseComponent
}

export function ComponentEditor({ component }: ComponentEditorProps) {
  const updateComponent = useCourseBuilder((state) => state.updateComponent)
  const [localData, setLocalData] = useState(component.data)

  const handleUpdate = (field: string, value: any) => {
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    updateComponent(component.id, newData)
  }

  const handleQuizOptionUpdate = (index: number, text: string) => {
    const newOptions = [...(localData.options || [])]
    newOptions[index] = { ...newOptions[index], text }
    handleUpdate('options', newOptions)
  }

  const addQuizOption = () => {
    const newOptions = [...(localData.options || [])]
    newOptions.push({
      id: `option-${Date.now()}`,
      text: `Option ${newOptions.length + 1}`
    })
    handleUpdate('options', newOptions)
  }

  const removeQuizOption = (index: number) => {
    const newOptions = [...(localData.options || [])]
    newOptions.splice(index, 1)
    handleUpdate('options', newOptions)
  }

  const renderTypeSpecificEditor = () => {
    switch (component.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={localData.content || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate('content', e.target.value)}
                placeholder="Enter your text content..."
                rows={6}
              />
            </div>
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={localData.videoUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('videoUrl', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="autoplay"
                checked={localData.autoplay || false}
                onCheckedChange={(checked: boolean) => handleUpdate('autoplay', checked)}
              />
              <Label htmlFor="autoplay">Autoplay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="controls"
                checked={localData.controls !== false}
                onCheckedChange={(checked: boolean) => handleUpdate('controls', checked)}
              />
              <Label htmlFor="controls">Show Controls</Label>
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={localData.imageUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={localData.alt || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('alt', e.target.value)}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={localData.caption || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('caption', e.target.value)}
                placeholder="Optional image caption"
              />
            </div>
          </div>
        )

      case 'quiz':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                value={localData.question || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate('question', e.target.value)}
                placeholder="Enter your question..."
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Answer Options</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addQuizOption}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              
              <div className="space-y-2">
                {localData.options?.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Input
                      value={option.text}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuizOptionUpdate(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeQuizOption(index)}
                      disabled={(localData.options?.length || 0) <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="correctAnswer">Correct Answer</Label>
              <Select
                value={localData.correctAnswer?.toString() || '0'}
                onValueChange={(value: string) => handleUpdate('correctAnswer', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  {localData.options?.map((option, index) => (
                    <SelectItem key={option.id} value={index.toString()}>
                      Option {index + 1}: {option.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                value={localData.explanation || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate('explanation', e.target.value)}
                placeholder="Explain why this is the correct answer..."
              />
            </div>
          </div>
        )

      case 'file-download':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fileName">File Name</Label>
              <Input
                id="fileName"
                value={localData.fileName || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('fileName', e.target.value)}
                placeholder="document.pdf"
              />
            </div>
            <div>
              <Label htmlFor="fileUrl">File URL</Label>
              <Input
                id="fileUrl"
                value={localData.fileUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('fileUrl', e.target.value)}
                placeholder="https://example.com/file.pdf"
              />
            </div>
            <div>
              <Label htmlFor="fileSize">File Size</Label>
              <Input
                id="fileSize"
                value={localData.fileSize || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('fileSize', e.target.value)}
                placeholder="2.5 MB"
              />
            </div>
          </div>
        )

      case 'audio':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Audio Title</Label>
              <Input
                id="title"
                value={localData.title || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('title', e.target.value)}
                placeholder="Audio lesson title"
              />
            </div>
            <div>
              <Label htmlFor="audioUrl">Audio URL</Label>
              <Input
                id="audioUrl"
                value={localData.audioUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('audioUrl', e.target.value)}
                placeholder="https://example.com/audio.mp3"
              />
            </div>
          </div>
        )

      case 'code':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                value={localData.code || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate('code', e.target.value)}
                placeholder="Enter your code..."
                rows={8}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={localData.language || 'javascript'}
                onValueChange={(value: string) => handleUpdate('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return <div>No specific settings for this component type.</div>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Component Settings</span>
        </CardTitle>
        <CardDescription>
          Configure the selected {component.type} component
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderTypeSpecificEditor()}
        
        {/* Common styling options */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Styling</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={localData.padding || '16px'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('padding', e.target.value)}
                placeholder="16px"
              />
            </div>
            
            {component.type !== 'spacer' && component.type !== 'divider' && (
              <>
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={localData.backgroundColor || '#ffffff'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('backgroundColor', e.target.value)}
                  />
                </div>
                
                {component.type === 'text' && (
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input
                      id="textColor"
                      type="color"
                      value={localData.textColor || '#000000'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate('textColor', e.target.value)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}