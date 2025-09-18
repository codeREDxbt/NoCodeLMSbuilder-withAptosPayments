"use client"

import type { ComponentPalette as ComponentPaletteType, ComponentType } from '@/types/course-builder'
import { useCourseBuilder } from '@/stores/course-builder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Type, 
  Video, 
  Image, 
  HelpCircle, 
  Download, 
  Volume2, 
  Code, 
  Minus, 
  Space 
} from 'lucide-react'

const componentPalette: ComponentPaletteType[] = [
  {
    id: 'text',
    type: 'text',
    label: 'Text Block',
    icon: 'Type',
    description: 'Rich text content with formatting options',
    defaultData: {}
  },
  {
    id: 'video',
    type: 'video',
    label: 'Video Player',
    icon: 'Video',
    description: 'Embed videos from URL or upload',
    defaultData: {}
  },
  {
    id: 'image',
    type: 'image',
    label: 'Image',
    icon: 'Image',
    description: 'Add images with captions',
    defaultData: {}
  },
  {
    id: 'quiz',
    type: 'quiz',
    label: 'Quiz',
    icon: 'HelpCircle',
    description: 'Multiple choice questions',
    defaultData: {}
  },
  {
    id: 'file-download',
    type: 'file-download',
    label: 'File Download',
    icon: 'Download',
    description: 'Downloadable course materials',
    defaultData: {}
  },
  {
    id: 'audio',
    type: 'audio',
    label: 'Audio Player',
    icon: 'Volume2',
    description: 'Audio content and podcasts',
    defaultData: {}
  },
  {
    id: 'code',
    type: 'code',
    label: 'Code Block',
    icon: 'Code',
    description: 'Syntax highlighted code examples',
    defaultData: {}
  },
  {
    id: 'divider',
    type: 'divider',
    label: 'Divider',
    icon: 'Minus',
    description: 'Visual separator between sections',
    defaultData: {}
  },
  {
    id: 'spacer',
    type: 'spacer',
    label: 'Spacer',
    icon: 'Space',
    description: 'Add vertical spacing',
    defaultData: {}
  }
]

const iconMap = {
  Type,
  Video,
  Image,
  HelpCircle,
  Download,
  Volume2,
  Code,
  Minus,
  Space
}

export function ComponentPalette() {
  const addComponent = useCourseBuilder((state) => state.addComponent)

  const handleAddComponent = (type: ComponentType) => {
    addComponent(type)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Components</CardTitle>
        <CardDescription>
          Drag and drop components to build your course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {componentPalette.map((component) => {
            const IconComponent = iconMap[component.icon as keyof typeof iconMap]
            
            return (
              <Button
                key={component.id}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start space-y-2 hover:bg-primary/5"
                onClick={() => handleAddComponent(component.type)}
              >
                <div className="flex items-center space-x-2 w-full">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{component.label}</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  {component.description}
                </p>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}