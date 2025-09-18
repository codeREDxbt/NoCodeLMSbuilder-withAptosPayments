"use client"

import { useState } from 'react'
import { useCourseBuilder } from '@/stores/course-builder'
import { ComponentPalette } from './component-palette'
import { ComponentRenderer } from './component-renderer'
import { ComponentEditor } from './component-editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, Edit, Save, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CourseBuilder() {
  const { components, selectedComponent, selectComponent } = useCourseBuilder()
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  const selectedComponentData = components.find(c => c.id === selectedComponent)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Course Builder</h1>
            <p className="text-sm text-gray-600">
              Drag and drop components to create your course content
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Tabs value={mode} onValueChange={(value) => setMode(value as 'edit' | 'preview')}>
              <TabsList>
                <TabsTrigger value="edit" className="flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Course</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Publish</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {mode === 'edit' && (
          <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Component Palette */}
              <ComponentPalette />
              
              {/* Component Editor */}
              {selectedComponentData && (
                <ComponentEditor component={selectedComponentData} />
              )}
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {mode === 'preview' ? (
              <PreviewMode components={components} />
            ) : (
              <EditMode 
                components={components} 
                selectedComponent={selectedComponent}
                onSelectComponent={selectComponent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface EditModeProps {
  components: any[]
  selectedComponent: string | null
  onSelectComponent: (id: string | null) => void
}

function EditMode({ components, selectedComponent, onSelectComponent }: EditModeProps) {
  if (components.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Edit className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Start Building Your Course</h3>
              <p className="text-gray-600">
                Add components from the sidebar to create engaging course content
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {components
        .sort((a, b) => a.order - b.order)
        .map((component) => (
          <ComponentRenderer
            key={component.id}
            component={component}
            isSelected={selectedComponent === component.id}
          />
        ))}
    </div>
  )
}

interface PreviewModeProps {
  components: any[]
}

function PreviewMode({ components }: PreviewModeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Course Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {components.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <p>No content added yet. Switch to Edit mode to add components.</p>
            </div>
          ) : (
            components
              .sort((a, b) => a.order - b.order)
              .map((component) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isSelected={false}
                  isPreview={true}
                />
              ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}