export interface CourseComponent {
  id: string
  type: ComponentType
  order: number
  data: ComponentData
}

export type ComponentType = 
  | 'text'
  | 'video'
  | 'image'
  | 'quiz'
  | 'file-download'
  | 'audio'
  | 'code'
  | 'divider'
  | 'spacer'

export interface ComponentData {
  // Text component
  content?: string
  
  // Video component
  videoUrl?: string
  autoplay?: boolean
  controls?: boolean
  
  // Image component
  imageUrl?: string
  alt?: string
  caption?: string
  
  // Quiz component
  question?: string
  options?: QuizOption[]
  correctAnswer?: number
  explanation?: string
  
  // File download component
  fileName?: string
  fileUrl?: string
  fileSize?: string
  
  // Audio component
  audioUrl?: string
  title?: string
  
  // Code component
  code?: string
  language?: string
  
  // Styling
  backgroundColor?: string
  textColor?: string
  padding?: string
  margin?: string
  borderRadius?: string
}

export interface QuizOption {
  id: string
  text: string
}

export interface CourseBuilderState {
  components: CourseComponent[]
  selectedComponent: string | null
  draggedComponent: CourseComponent | null
}

export interface ComponentPalette {
  id: string
  type: ComponentType
  label: string
  icon: string
  description: string
  defaultData: ComponentData
}