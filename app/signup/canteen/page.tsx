"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  FileText,
  Building,
  Calendar,
  Upload,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Hash,
  UserCheck,
  UtensilsCrossed,
  Clock,
  Store
} from "lucide-react"

export default function CanteenSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Section 1: Business Information
    businessName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    alternatePhone: "",
    address: "",
    gstNumber: "",

    // Section 2: Operation Details
    licenseNumber: "",
    cuisineTypes: [] as string[],
    operatingHours: {
      openTime: "",
      closeTime: "",
    },
    seatingCapacity: "",
    servingCapacity: "",
    
    // Section 3: Contact & Legal
    emergencyContactName: "",
    emergencyContactPhone: "",
    bankAccountNumber: "",
    bankIFSC: "",
    panNumber: "",

    // Section 4: Additional Information
    description: "",
    specialities: [] as string[],
    profilePicture: null as File | null,
    businessLicense: null as File | null,
    foodLicense: null as File | null,
  })

  const [newCuisine, setNewCuisine] = useState("")
  const [newSpeciality, setNewSpeciality] = useState("")

  const cuisineOptions = [
    "North Indian",
    "South Indian", 
    "Chinese",
    "Continental",
    "Italian",
    "Fast Food",
    "Snacks",
    "Beverages",
    "Desserts",
    "Healthy Food",
    "Street Food",
    "Regional"
  ]

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const addCuisine = () => {
    if (newCuisine.trim() && !formData.cuisineTypes.includes(newCuisine.trim())) {
      setFormData(prev => ({ ...prev, cuisineTypes: [...prev.cuisineTypes, newCuisine.trim()] }))
      setNewCuisine("")
    }
  }

  const removeCuisine = (cuisine: string) => {
    setFormData(prev => ({ ...prev, cuisineTypes: prev.cuisineTypes.filter(c => c !== cuisine) }))
  }

  const addSpeciality = () => {
    if (newSpeciality.trim() && !formData.specialities.includes(newSpeciality.trim())) {
      setFormData(prev => ({ ...prev, specialities: [...prev.specialities, newSpeciality.trim()] }))
      setNewSpeciality("")
    }
  }

  const removeSpeciality = (speciality: string) => {
    setFormData(prev => ({ ...prev, specialities: prev.specialities.filter(s => s !== speciality) }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePicture' | 'businessLicense' | 'foodLicense') => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }))
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Store user data in localStorage
    localStorage.setItem('canteenData', JSON.stringify(formData))
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', 'canteen')
    localStorage.setItem('currentUser', JSON.stringify({
      id: Date.now(),
      name: formData.businessName,
      owner: formData.ownerName,
      email: formData.email,
      role: 'canteen',
      licenseNumber: formData.licenseNumber
    }))

    setIsLoading(false)
    window.location.href = '/canteen/dashboard'
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <Store className="h-6 w-6 text-[#e78a53]" />
                </div>
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Building className="h-4 w-4 text-[#e78a53]" />
                    Business Name
                  </Label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter your canteen/restaurant name"
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Owner Name</Label>
                  <Input
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Enter owner's full name"
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#e78a53]" />
                  Business Email
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter business email address"
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#e78a53]" />
                    Password
                  </Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create password"
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Confirm Password</Label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm password"
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#e78a53]" />
                    Primary Phone
                  </Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter primary phone number"
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Alternate Phone (Optional)</Label>
                  <Input
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                    placeholder="Enter alternate phone number"
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#e78a53]" />
                  Business Address
                </Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete business address"
                  className="bg-background/50 border-border/50 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[#e78a53]" />
                  GST Number (Optional)
                </Label>
                <Input
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  placeholder="Enter GST registration number"
                  className="bg-background/50 border-border/50"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <UtensilsCrossed className="h-6 w-6 text-[#e78a53]" />
                </div>
                Operation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[#e78a53]" />
                  Food License Number
                </Label>
                <Input
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  placeholder="Enter FSSAI license number"
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-foreground flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-[#e78a53]" />
                  Cuisine Types
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => {
                        if (formData.cuisineTypes.includes(cuisine)) {
                          removeCuisine(cuisine)
                        } else {
                          setFormData(prev => ({ ...prev, cuisineTypes: [...prev.cuisineTypes, cuisine] }))
                        }
                      }}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        formData.cuisineTypes.includes(cuisine)
                          ? 'bg-[#e78a53]/20 border-[#e78a53]/50 text-[#e78a53]'
                          : 'bg-background/30 border-border/50 text-zinc-400 hover:bg-background/50'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newCuisine}
                    onChange={(e) => setNewCuisine(e.target.value)}
                    placeholder="Add custom cuisine type"
                    className="bg-background/50 border-border/50"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCuisine())}
                  />
                  <Button onClick={addCuisine} size="icon" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.cuisineTypes.map((cuisine) => (
                    <Badge key={cuisine} variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {cuisine}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removeCuisine(cuisine)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#e78a53]" />
                  Operating Hours
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">Opening Time</Label>
                    <Input
                      type="time"
                      value={formData.operatingHours.openTime}
                      onChange={(e) => handleInputChange('operatingHours.openTime', e.target.value)}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground text-sm">Closing Time</Label>
                    <Input
                      type="time"
                      value={formData.operatingHours.closeTime}
                      onChange={(e) => handleInputChange('operatingHours.closeTime', e.target.value)}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Seating Capacity</Label>
                  <Input
                    type="number"
                    value={formData.seatingCapacity}
                    onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                    placeholder="e.g., 50"
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Daily Serving Capacity</Label>
                  <Input
                    type="number"
                    value={formData.servingCapacity}
                    onChange={(e) => handleInputChange('servingCapacity', e.target.value)}
                    placeholder="e.g., 200 meals/day"
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <UserCheck className="h-6 w-6 text-[#e78a53]" />
                </div>
                Contact & Legal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Contact Person Name</Label>
                    <Input
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      placeholder="Enter emergency contact name"
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Contact Phone</Label>
                    <Input
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      placeholder="Enter emergency contact phone"
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Banking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Bank Account Number</Label>
                    <Input
                      value={formData.bankAccountNumber}
                      onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                      placeholder="Enter bank account number"
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">IFSC Code</Label>
                    <Input
                      value={formData.bankIFSC}
                      onChange={(e) => handleInputChange('bankIFSC', e.target.value)}
                      placeholder="Enter IFSC code"
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">PAN Number</Label>
                <Input
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value)}
                  placeholder="Enter PAN number"
                  className="bg-background/50 border-border/50"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#e78a53]/10 rounded-lg">
                  <FileText className="h-6 w-6 text-[#e78a53]" />
                </div>
                Additional Information & Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <Label className="text-foreground flex items-center gap-2">
                    <Upload className="h-4 w-4 text-[#e78a53]" />
                    Business Photo
                  </Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'profilePicture')}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <Upload className="h-6 w-6 text-[#e78a53] mx-auto mb-2" />
                      <p className="text-foreground text-sm">
                        {formData.profilePicture ? formData.profilePicture.name : 'Upload photo'}
                      </p>
                      <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-foreground flex items-center gap-2">
                    <Upload className="h-4 w-4 text-[#e78a53]" />
                    Business License
                  </Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => handleFileUpload(e, 'businessLicense')}
                      className="hidden"
                      id="business-upload"
                    />
                    <label htmlFor="business-upload" className="cursor-pointer">
                      <Upload className="h-6 w-6 text-[#e78a53] mx-auto mb-2" />
                      <p className="text-foreground text-sm">
                        {formData.businessLicense ? formData.businessLicense.name : 'Upload license'}
                      </p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG</p>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-foreground flex items-center gap-2">
                    <Upload className="h-4 w-4 text-[#e78a53]" />
                    Food License (FSSAI)
                  </Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => handleFileUpload(e, 'foodLicense')}
                      className="hidden"
                      id="food-upload"
                    />
                    <label htmlFor="food-upload" className="cursor-pointer">
                      <Upload className="h-6 w-6 text-[#e78a53] mx-auto mb-2" />
                      <p className="text-foreground text-sm">
                        {formData.foodLicense ? formData.foodLicense.name : 'Upload license'}
                      </p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG</p>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#e78a53]" />
                  Business Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your canteen, specialties, experience, unique offerings..."
                  className="bg-background/50 border-border/50 min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-foreground">Specialities & Popular Items</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSpeciality}
                    onChange={(e) => setNewSpeciality(e.target.value)}
                    placeholder="Add speciality (e.g., Biryani, Pizza, Fresh Juice)"
                    className="bg-background/50 border-border/50"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpeciality())}
                  />
                  <Button onClick={addSpeciality} size="icon" className="bg-[#e78a53] hover:bg-[#e78a53]/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialities.map((speciality) => (
                    <Badge key={speciality} variant="secondary" className="bg-[#e78a53]/10 text-[#e78a53]">
                      {speciality}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removeSpeciality(speciality)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Link
        href="/signup"
        className="absolute top-6 left-6 z-20 text-zinc-400 hover:text-[#e78a53] transition-colors duration-200 flex items-center space-x-2"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Role Selection</span>
      </Link>

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#e78a53]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#e78a53]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Canteen Registration</h1>
          <p className="text-zinc-400">Join our campus food service network in just 4 simple steps</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= step
                    ? 'bg-[#e78a53] border-[#e78a53] text-white'
                    : 'bg-transparent border-zinc-600 text-zinc-600'
                  }`}>
                  {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-[#e78a53]' : 'bg-zinc-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {renderStep()}
        </motion.div>

        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              className="bg-[#e78a53] hover:bg-[#e78a53]/90 flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-[#e78a53] hover:bg-[#e78a53]/90 flex items-center gap-2"
            >
              {isLoading ? "Submitting Application..." : "Submit Application"}
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#e78a53] hover:text-[#e78a53]/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
