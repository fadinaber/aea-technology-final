export interface Specification {
  parameter: string
  value: string
}

export interface Certification {
  name: string
  description: string
}

export interface ProductModel {
  name: string
  partNumber: string
  type: string
  description: string
  includes: string[]
  popular?: boolean
}

export interface ProductData {
  name: string
  tagline: string
  shortDescription: string
  modelImages: Record<number, string[]>
  keyFeatures: string[]
  specifications: {
    performance?: Specification[]
    advanced?: Specification[]
    hardware?: Specification[]
    physical?: Specification[]
  }
  certifications: Certification[]
  models: ProductModel[]
}
