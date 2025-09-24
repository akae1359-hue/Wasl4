import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  FileText, 
  Building, 
  User, 
  CreditCard, 
  CheckCircle,
  Calendar,
  MapPin,
  Database
} from 'lucide-react'

const CorporateApplication = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    trn: '',
    tradeLicenseNumber: '',
    tradeLicenseExpiry: '',
    companyProfile: null,
    
    // Authorized Signatory
    ownerName: '',
    passportCopy: null,
    emiratesId: null,
    powerOfAttorney: null,
    requiresPOA: false,
    
    // Contact & Billing
    contactPerson: '',
    email: '',
    phone: '',
    billingAddress: '',
    preferredComm: 'email',
    
    // Unit Selection
    selectedProject: 'Wasl 1',
    selectedBuilding: 'Tower A',
    selectedUnit: '1205',
    rooms: '2 BR',
    termLength: '12',
    startDate: '',
    
    // Consent
    termsAccepted: false,
    privacyAccepted: false
  })

  // Sample data for auto-fill
  const sampleData = {
    companyName: 'Khamis Bin Abood Trading LLC',
    trn: '100123456789003',
    tradeLicenseNumber: 'CN-1234567',
    tradeLicenseExpiry: '2025-12-31',
    ownerName: 'Khamis Bin Abood',
    contactPerson: 'Khamis Bin Abood',
    email: 'khamis.abood@company.ae',
    phone: '+971 50 123 4567',
    billingAddress: 'Office 1205, Tower A, Wasl 1, Za\'abeel 1, Dubai, UAE',
    selectedProject: 'Wasl 1',
    selectedBuilding: 'Tower A',
    selectedUnit: '1205',
    rooms: '2 BR',
    termLength: '12',
    startDate: '2025-01-01',
    termsAccepted: true,
    privacyAccepted: true
  }

  const steps = [
    { id: 1, title: 'Company Details', icon: Building },
    { id: 2, title: 'Authorized Signatory', icon: User },
    { id: 3, title: 'Contact Information', icon: CreditCard },
    { id: 4, title: 'Unit Requirements', icon: MapPin },
    { id: 5, title: 'Review & Submit', icon: CheckCircle }
  ]

  const progress = (currentStep / steps.length) * 100

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const handleAutoFill = () => {
    setFormData(prev => ({ ...prev, ...sampleData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const FileUploadComponent = ({ field, label, required = false, accept = "*/*" }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          {formData[field] ? formData[field].name || 'File uploaded' : 'Drag and drop or click to upload'}
        </p>
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileUpload(field, e.target.files[0])}
          className="hidden"
          id={field}
        />
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => document.getElementById(field).click()}
        >
          {formData[field] ? 'Change File' : 'Upload Company Profile'}
        </Button>
        {formData[field] && (
          <Badge className="ml-2 bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Uploaded
          </Badge>
        )}
        <p className="text-xs text-gray-500 mt-2">PDF, DOC, or DOCX up to 10MB</p>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Company Details</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAutoFill}
                className="flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Auto-fill Sample Data
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trn">Tax Registration Number (TRN) *</Label>
                <Input
                  id="trn"
                  value={formData.trn}
                  onChange={(e) => handleInputChange('trn', e.target.value)}
                  placeholder="100123456789003"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tradeLicenseNumber">Trade License Number *</Label>
                <Input
                  id="tradeLicenseNumber"
                  value={formData.tradeLicenseNumber}
                  onChange={(e) => handleInputChange('tradeLicenseNumber', e.target.value)}
                  placeholder="CN-1234567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tradeLicenseExpiry">Trade License Expiry *</Label>
                <Input
                  id="tradeLicenseExpiry"
                  type="date"
                  value={formData.tradeLicenseExpiry}
                  onChange={(e) => handleInputChange('tradeLicenseExpiry', e.target.value)}
                />
              </div>
            </div>

            <FileUploadComponent 
              field="companyProfile"
              label="Company Profile Document *"
              required={true}
              accept=".pdf,.doc,.docx"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Authorized Signatory</h3>
            
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner/Authorized Person Name *</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                placeholder="Enter full name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FileUploadComponent 
                field="passportCopy"
                label="Passport Copy *"
                required={true}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <FileUploadComponent 
                field="emiratesId"
                label="Emirates ID (Front & Back) *"
                required={true}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="requiresPOA"
                  checked={formData.requiresPOA}
                  onCheckedChange={(checked) => handleInputChange('requiresPOA', checked)}
                />
                <Label htmlFor="requiresPOA">Power of Attorney Required</Label>
              </div>
              
              {formData.requiresPOA && (
                <FileUploadComponent 
                  field="powerOfAttorney"
                  label="Power of Attorney Document"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Enter contact person name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+971 50 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredComm">Preferred Communication</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.preferredComm}
                  onChange={(e) => handleInputChange('preferredComm', e.target.value)}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address *</Label>
              <Textarea
                id="billingAddress"
                value={formData.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                placeholder="Enter complete billing address"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Unit Requirements</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="selectedProject">Project *</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.selectedProject}
                  onChange={(e) => handleInputChange('selectedProject', e.target.value)}
                >
                  <option value="Wasl 1">Wasl 1</option>
                  <option value="Wasl Gate">Wasl Gate</option>
                  <option value="One B Tower">One B Tower</option>
                  <option value="Hillside Residences">Hillside Residences</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="selectedBuilding">Building *</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.selectedBuilding}
                  onChange={(e) => handleInputChange('selectedBuilding', e.target.value)}
                >
                  <option value="Tower A">Tower A</option>
                  <option value="Tower B">Tower B</option>
                  <option value="Building B">Building B</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="selectedUnit">Preferred Unit</Label>
                <Input
                  id="selectedUnit"
                  value={formData.selectedUnit}
                  onChange={(e) => handleInputChange('selectedUnit', e.target.value)}
                  placeholder="e.g., 1205"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms *</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                >
                  <option value="1 BR">1 Bedroom</option>
                  <option value="2 BR">2 Bedrooms</option>
                  <option value="3 BR">3 Bedrooms</option>
                  <option value="4 BR">4 Bedrooms</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="termLength">Lease Term (Months) *</Label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.termLength}
                  onChange={(e) => handleInputChange('termLength', e.target.value)}
                >
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Project Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img src="/Bxe9qaiO4czx.jpg" alt="Wasl Project 1" className="w-full h-24 object-cover rounded" />
                <img src="/fzEVMg8XUW5I.webp" alt="Wasl Project 2" className="w-full h-24 object-cover rounded" />
                <img src="/YV7or4Yr53Qz.webp" alt="Wasl Project 3" className="w-full h-24 object-cover rounded" />
                <img src="/nqQ9HBxYeN6B.jpg" alt="Wasl Project 4" className="w-full h-24 object-cover rounded" />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review & Submit</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Company:</strong> {formData.companyName}</p>
                  <p><strong>TRN:</strong> {formData.trn}</p>
                  <p><strong>License:</strong> {formData.tradeLicenseNumber}</p>
                  <p><strong>Owner:</strong> {formData.ownerName}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Contact:</strong> {formData.contactPerson}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Unit Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Project:</strong> {formData.selectedProject}</p>
                  <p><strong>Building:</strong> {formData.selectedBuilding}</p>
                  <p><strong>Unit:</strong> {formData.selectedUnit}</p>
                  <p><strong>Rooms:</strong> {formData.rooms}</p>
                  <p><strong>Term:</strong> {formData.termLength} months</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Company Profile:</strong> {formData.companyProfile ? '✓ Uploaded' : '✗ Required'}</p>
                  <p><strong>Passport Copy:</strong> {formData.passportCopy ? '✓ Uploaded' : '✗ Required'}</p>
                  <p><strong>Emirates ID:</strong> {formData.emiratesId ? '✓ Uploaded' : '✗ Required'}</p>
                  {formData.requiresPOA && (
                    <p><strong>Power of Attorney:</strong> {formData.powerOfAttorney ? '✓ Uploaded' : '✗ Required'}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                />
                <Label htmlFor="termsAccepted">I accept the Terms and Conditions *</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked)}
                />
                <Label htmlFor="privacyAccepted">I accept the Privacy Policy *</Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/discovery" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Properties
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Corporate Rental Application</h1>
          <p className="text-gray-600">Complete your application in 5 simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button 
              onClick={nextStep}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              className="flex items-center bg-green-600 hover:bg-green-700"
              disabled={!formData.termsAccepted || !formData.privacyAccepted}
            >
              Submit Application
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CorporateApplication
