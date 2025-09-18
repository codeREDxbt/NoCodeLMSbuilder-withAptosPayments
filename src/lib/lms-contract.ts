import { Aptos, InputEntryFunctionData } from '@aptos-labs/ts-sdk'
import { CONTRACT_ADDRESS, MODULE_NAME } from '@/components/providers/aptos-provider'

export interface Course {
  id: number
  title: string
  description: string
  price: number
  instructor: string
  published: boolean
  student_count: number
}

export interface Enrollment {
  student: string
  course_id: number
  enrolled_at: number
}

export class LMSContract {
  private aptos: Aptos

  constructor(aptos: Aptos) {
    this.aptos = aptos
  }

  // Initialize the platform (admin only)
  async initializePlatform(account: any) {
    const payload: InputEntryFunctionData = {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::initialize_platform`,
      functionArguments: []
    }
    
    return await this.aptos.transaction.build.simple({
      sender: account.address,
      data: payload
    })
  }

  // Create a new course
  async createCourse(account: any, title: string, description: string, price: number) {
    const payload: InputEntryFunctionData = {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::create_course`,
      functionArguments: [title, description, price]
    }
    
    return await this.aptos.transaction.build.simple({
      sender: account.address,
      data: payload
    })
  }

  // Publish a course
  async publishCourse(account: any, courseId: number) {
    const payload: InputEntryFunctionData = {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::publish_course`,
      functionArguments: [courseId]
    }
    
    return await this.aptos.transaction.build.simple({
      sender: account.address,
      data: payload
    })
  }

  // Enroll in a course
  async enrollInCourse(account: any, instructorAddress: string, courseId: number) {
    const payload: InputEntryFunctionData = {
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::enroll_in_course`,
      functionArguments: [instructorAddress, courseId]
    }
    
    return await this.aptos.transaction.build.simple({
      sender: account.address,
      data: payload
    })
  }

  // Get course info
  async getCourseInfo(instructorAddress: string, courseId: number) {
    try {
      const resource = await this.aptos.getAccountResource({
        accountAddress: instructorAddress,
        resourceType: `${CONTRACT_ADDRESS}::${MODULE_NAME}::Course`
      })
      return resource
    } catch (error) {
      console.error('Error fetching course info:', error)
      return null
    }
  }

  // Get enrollment info
  async getEnrollmentInfo(studentAddress: string, instructorAddress: string, courseId: number) {
    try {
      const resource = await this.aptos.getAccountResource({
        accountAddress: studentAddress,
        resourceType: `${CONTRACT_ADDRESS}::${MODULE_NAME}::Enrollment`
      })
      return resource
    } catch (error) {
      console.error('Error fetching enrollment info:', error)
      return null
    }
  }

  // Get platform info
  async getPlatformInfo() {
    try {
      const resource = await this.aptos.getAccountResource({
        accountAddress: CONTRACT_ADDRESS,
        resourceType: `${CONTRACT_ADDRESS}::${MODULE_NAME}::Platform`
      })
      return resource
    } catch (error) {
      console.error('Error fetching platform info:', error)
      return null
    }
  }
}

// Export a singleton instance
export const createLMSContract = (aptos: Aptos) => new LMSContract(aptos)