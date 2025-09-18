import { create } from 'zustand'
import { CourseComponent, ComponentType, ComponentData } from '@/types/course-builder'

interface CourseBuilderStore {
  components: CourseComponent[]
  selectedComponent: string | null
  
  // Actions
  addComponent: (type: ComponentType, data?: Partial<ComponentData>) => void
  updateComponent: (id: string, data: Partial<ComponentData>) => void
  deleteComponent: (id: string) => void
  reorderComponents: (oldIndex: number, newIndex: number) => void
  selectComponent: (id: string | null) => void
  duplicateComponent: (id: string) => void
  clearComponents: () => void
}

export const useCourseBuilder = create<CourseBuilderStore>((set, get) => ({
  components: [],
  selectedComponent: null,

  addComponent: (type: ComponentType, data = {}) => {
    const component: CourseComponent = {
      id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      order: get().components.length,
      data: getDefaultDataForType(type, data)
    }
    
    set((state) => ({
      components: [...state.components, component],
      selectedComponent: component.id
    }))
  },

  updateComponent: (id: string, data: Partial<ComponentData>) => {
    set((state) => ({
      components: state.components.map(component =>
        component.id === id
          ? { ...component, data: { ...component.data, ...data } }
          : component
      )
    }))
  },

  deleteComponent: (id: string) => {
    set((state) => ({
      components: state.components
        .filter(component => component.id !== id)
        .map((component, index) => ({ ...component, order: index })),
      selectedComponent: state.selectedComponent === id ? null : state.selectedComponent
    }))
  },

  reorderComponents: (oldIndex: number, newIndex: number) => {
    set((state) => {
      const newComponents = [...state.components]
      const [removed] = newComponents.splice(oldIndex, 1)
      newComponents.splice(newIndex, 0, removed)
      
      // Update order numbers
      return {
        components: newComponents.map((component, index) => ({
          ...component,
          order: index
        }))
      }
    })
  },

  selectComponent: (id: string | null) => {
    set({ selectedComponent: id })
  },

  duplicateComponent: (id: string) => {
    const component = get().components.find(c => c.id === id)
    if (component) {
      const duplicated: CourseComponent = {
        ...component,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: get().components.length
      }
      
      set((state) => ({
        components: [...state.components, duplicated],
        selectedComponent: duplicated.id
      }))
    }
  },

  clearComponents: () => {
    set({
      components: [],
      selectedComponent: null
    })
  }
}))

function getDefaultDataForType(type: ComponentType, overrides: Partial<ComponentData> = {}): ComponentData {
  const defaults: Record<ComponentType, ComponentData> = {
    text: {
      content: '<p>Enter your text here...</p>',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      padding: '16px',
    },
    video: {
      videoUrl: '',
      autoplay: false,
      controls: true,
      padding: '16px',
    },
    image: {
      imageUrl: '',
      alt: 'Course image',
      caption: '',
      padding: '16px',
    },
    quiz: {
      question: 'What is the correct answer?',
      options: [
        { id: '1', text: 'Option A' },
        { id: '2', text: 'Option B' },
        { id: '3', text: 'Option C' },
        { id: '4', text: 'Option D' }
      ],
      correctAnswer: 0,
      explanation: 'Explanation for the correct answer...',
      padding: '16px',
    },
    'file-download': {
      fileName: 'course-material.pdf',
      fileUrl: '',
      fileSize: '2.5 MB',
      padding: '16px',
    },
    audio: {
      audioUrl: '',
      title: 'Audio Lesson',
      padding: '16px',
    },
    code: {
      code: 'console.log("Hello, World!");',
      language: 'javascript',
      backgroundColor: '#f8f9fa',
      padding: '16px',
    },
    divider: {
      backgroundColor: '#e2e8f0',
      margin: '24px 0',
    },
    spacer: {
      padding: '32px',
    }
  }

  return { ...defaults[type], ...overrides }
}