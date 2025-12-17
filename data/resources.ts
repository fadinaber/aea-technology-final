export interface ResourceType {
  icon: string
  title: string
  description: string
  count: string
}

export const resourceTypes: ResourceType[] = [
  {
    icon: "Download",
    title: "Software",
    description: "Latest software updates and calibration utilities",
    count: "15+ Downloads",
  },
  {
    icon: "FileText",
    title: "Manuals & Documentation",
    description: "Comprehensive user guides and technical specifications",
    count: "50+ Documents",
  },
  {
    icon: "Play",
    title: "Training Videos",
    description: "Step-by-step tutorials and product demonstrations",
    count: "25+ Videos",
  },
]
