"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, MapPin, Phone, Clock, Globe, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import { SupportCTA } from "@/components/support-cta"

type FormType = "contact" | "quote" | "support"
type SubmitStatus = "idle" | "loading" | "success" | "error"

interface ContactPageClientProps {
  products: string[]
}

function ContactPageClient({ products }: ContactPageClientProps) {
  const [formType, setFormType] = useState<FormType>("quote")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    supportProduct: "",
  })

  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) => (prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          ...formData,
          selectedProducts: formType === "quote" ? selectedProducts : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitStatus("success")
      // Reset form after success
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        message: "",
        supportProduct: "",
      })
      setSelectedProducts([])
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  const handleReset = () => {
    setSubmitStatus("idle")
    setErrorMessage("")
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 bg-zinc-50">
      <div className="text-center mb-8 sm:mb-12 mt-20">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 px-4">
          Contact AEA Technology
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">
          Get a fast and easy quote from AEA Technology, Inc. or a distributor. If you have questions about our
          products, don't hesitate to call or email us at any time.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Information */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-semibold text-slate-900">
                Local: (760) 931-8979
                <br />
                Toll Free: 1-(800) 258-7805
              </p>
              <p className="text-slate-600 text-sm sm:text-base">Technical Support & Sales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-slate-900">SALES@AEATECHNOLOGY.COM</p>
                  <p className="text-sm sm:text-base text-slate-600">Sales & Product Inquiries</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">TECHSUPPORT@AEATECHNOLOGY.COM</p>
                  <p className="text-sm sm:text-base text-slate-600">Technical Support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Our Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium text-slate-900">AEA Technology</p>
                <p className="text-slate-600 text-sm sm:text-base">
                  5933 Sea Lion Place, Ste 112
                  <br />
                  Carlsbad, CA 92010
                  <br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-slate-600">
                <p>
                  <span className="font-medium">Monday - Friday:</span> 7:30 am – 4:30 pm (PST)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Distributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm sm:text-base mb-4">
                Find authorized distributors in your region for sales and support.
              </p>
              <Button asChild className="w-full cursor-pointer">
                <Link href="/contact/distributors">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find a Distributor
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Forms */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button
                  variant={formType === "quote" ? "default" : "outline"}
                  onClick={() => {
                    setFormType("quote")
                    handleReset()
                  }}
                  className="cursor-pointer text-sm sm:text-base min-h-[44px]"
                >
                  Request a Quote
                </Button>
                <Button
                  variant={formType === "contact" ? "default" : "outline"}
                  onClick={() => {
                    setFormType("contact")
                    handleReset()
                  }}
                  className="cursor-pointer text-sm sm:text-base min-h-[44px]"
                >
                  General Contact
                </Button>
                <Button
                  variant={formType === "support" ? "default" : "outline"}
                  onClick={() => {
                    setFormType("support")
                    handleReset()
                  }}
                  className="cursor-pointer text-sm sm:text-base min-h-[44px]"
                >
                  Technical Support
                </Button>
              </div>
              <CardTitle className="text-lg sm:text-xl">
                {formType === "quote"
                  ? "Request a Product Quote"
                  : formType === "support"
                    ? "Technical Support Request"
                    : "General Inquiry"}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {formType === "quote"
                  ? "Get a personalized quote for AEA Technology testing equipment"
                  : formType === "support"
                    ? "Get help with your AEA Technology products and technical questions"
                    : "Send us a message and we'll get back to you promptly"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-600 mb-6">
                    {formType === "quote"
                      ? "Thank you for your quote request. Our sales team will contact you within 2 business days."
                      : formType === "support"
                        ? "Thank you for contacting support. Our technical team will respond within 1 business day."
                        : "Thank you for your message. We'll get back to you shortly."}
                  </p>
                  <Button onClick={handleReset}>Send Another Message</Button>
                </div>
              ) : (
                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">Failed to send message</p>
                        <p className="text-sm text-red-600">
                          {errorMessage || "Please try again or contact us directly."}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm sm:text-base">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className="min-h-[44px] text-[16px]"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm sm:text-base">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className="min-h-[44px] text-[16px]"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm sm:text-base">
                      Company *
                    </Label>
                    <Input
                      id="company"
                      placeholder="Your Company Name"
                      required
                      className="min-h-[44px] text-[16px]"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm sm:text-base">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="min-h-[44px] text-[16px]"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm sm:text-base">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required
                        className="min-h-[44px] text-[16px]"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm sm:text-base">
                      Country *
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formType === "quote" && (
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                          What types of products are you interested in?
                        </h3>
                        <p className="text-sm text-slate-600">Please check all that apply</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {products.map((product) => (
                          <label
                            key={product}
                            className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-gray-50 transition-colors"
                          >
                            <Checkbox
                              checked={selectedProducts.includes(product)}
                              onCheckedChange={() => toggleProduct(product)}
                              className="accent-blue-600"
                            />
                            <span className="text-sm sm:text-base text-slate-700 group-hover:text-slate-900">
                              {product}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {formType === "support" && (
                    <div className="space-y-2">
                      <Label htmlFor="product" className="text-sm sm:text-base">
                        Which product do you need help with? *
                      </Label>
                      <Select
                        value={formData.supportProduct}
                        onValueChange={(value) => handleSelectChange("supportProduct", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm sm:text-base">
                      {formType === "quote"
                        ? "Specific Requirements / Message"
                        : formType === "support"
                          ? "Describe Your Issue"
                          : "Message"}{" "}
                      *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={
                        formType === "quote"
                          ? "Please describe your testing requirements, application, and any specific features you need..."
                          : formType === "support"
                            ? "Please describe the issue you're experiencing in detail..."
                            : "How can we help you today?"
                      }
                      className="min-h-[120px] text-[16px]"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  {formType === "quote" && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">What happens next?</h4>
                      <ul className="text-sm sm:text-base text-slate-700 space-y-1">
                        <li>• Our technical team will review your requirements</li>
                        <li>• We'll contact you within 2 business days to discuss your needs</li>
                        <li>• You'll receive a detailed quote with pricing and specifications</li>
                        <li>• Optional: Schedule a product demonstration or consultation</li>
                      </ul>
                    </div>
                  )}

                  {formType === "support" && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Technical Support Response</h4>
                      <ul className="text-sm sm:text-base text-slate-700 space-y-1">
                        <li>• Our technical support team will review your issue</li>
                        <li>• We'll respond within 1 business day</li>
                        <li>• Have your product serial number ready for faster service</li>
                        <li>• For urgent issues, please call: (760) 931-8979</li>
                      </ul>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[48px] text-sm sm:text-base cursor-pointer"
                    disabled={submitStatus === "loading"}
                  >
                    {submitStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : formType === "quote" ? (
                      "Request Quote"
                    ) : formType === "support" ? (
                      "Submit Support Request"
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 gap-6 sm:gap-8">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Purchasing Options</CardTitle>
          </CardHeader>
          <CardContent className="text-green-700">
            <p className="mb-3 font-medium">You can purchase directly from AEA Technology via:</p>
            <ul className="space-y-2 mb-4">
              <li>• Credit Card</li>
              <li>• Purchase Order (qualified buyers)</li>
              <li>• Wire Transfer / ACH</li>
              <li>• Check</li>
            </ul>
            <p className="text-sm">
              <strong>Note:</strong> Customers in countries with local distributors will be referred to our distributor
              for better service.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Technical Support</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <p className="mb-4">Need immediate technical assistance? Our support team is available to help with:</p>
            <ul className="space-y-2">
              <li>• Product operation and troubleshooting</li>
              <li>• Software updates</li>
              <li>• Calibration and maintenance guidance</li>
              <li>• Application-specific questions</li>
              <li>• Warranty and repair services</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* SupportCTA section at bottom of contact page */}
      <SupportCTA />
    </div>
  )
}

export default ContactPageClient
