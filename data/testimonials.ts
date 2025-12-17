export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  industry: string
  rating: number
  quote: string
  avatar?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "icecube-team",
    name: "Project IceCube Team",
    title: "Cable Engineering Team",
    company: "University of Wisconsin",
    industry: "Scientific Research",
    rating: 5,
    quote:
      "The Project Ice Cube's Engineering Team has complete confidence in AEA Technology's 20/20 TDR to perform accurately and reliably, whether at the University of Wisconsin or at the South Pole.",
  },
  {
    id: "michael-rodriguez",
    name: "Michael Rodriguez",
    title: "Senior RF Engineer",
    company: "TechCorp Communications",
    industry: "Aviation & Telecommunications",
    rating: 5,
    quote:
      "AEA Technology's E20/20 TDR has been instrumental in our network maintenance operations. The accuracy and reliability are unmatched, and their technical support is exceptional.",
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "Lead Test Engineer",
    company: "Aerospace Dynamics",
    industry: "Aerospace & Defense",
    rating: 5,
    quote:
      "The build quality and precision of AEA's instruments are exceptional. We've tested cables in extreme conditions, and these devices never let us down.",
  },
  {
    id: "charles-gervasi-1",
    name: "Charles Gervasi",
    title: "RF Testing Specialist",
    company: "Independent Consultant",
    industry: "RF Testing & Analysis",
    rating: 5,
    quote:
      "It must have been hard for the engineers who designed the VIA Echo to sacrifice functionality to keep the cost down, but they did an excellent job. On the features that actually make a difference when matching impedances it is close to being as good as equipment three times the cost.",
  },
  {
    id: "charles-gervasi-2",
    name: "Charles Gervasi",
    title: "RF Testing Specialist",
    company: "Independent Consultant",
    industry: "RF Testing & Analysis",
    rating: 5,
    quote:
      "I would highly recommend this scope for someone on a tight budget who needs something basic around the lab and can rent something more expensive as needed. It would also be good for someone with unlimited budget who needs something easy to carry for quick testing on top of buildings or towers.",
  },
]

// Helper functions for CMS integration
export const getTestimonials = () => testimonials
export const getTestimonialById = (id: string) => testimonials.find((t) => t.id === id)
export const getTestimonialsByIndustry = (industry: string) => testimonials.filter((t) => t.industry === industry)
