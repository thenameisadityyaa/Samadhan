// src/pages/ReportIssuePage.tsx
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  CheckCircle, 
  Upload, 
  Clock,
  Star,
  ArrowRight,
  X,
  Locate
} from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function ReportIssuePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    issueType: '',
    location: '',
    coordinates: { lat: 0, lng: 0 },
    description: '',
    photos: [] as File[],
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    urgency: 'medium'
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.9716, 77.5946]); // Default to Bangalore
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const issueTypes = [
    { id: 'pothole', label: 'Pothole', icon: '🕳️' },
    { id: 'streetlight', label: 'Broken Streetlight', icon: '💡' },
    { id: 'garbage', label: 'Garbage Collection', icon: '🗑️' },
    { id: 'water', label: 'Water Issue', icon: '💧' },
    { id: 'traffic', label: 'Traffic Signal', icon: '🚦' },
    { id: 'sidewalk', label: 'Sidewalk Damage', icon: '🚶' },
    { id: 'drainage', label: 'Drainage Problem', icon: '🌊' },
    { id: 'other', label: 'Other', icon: '📋' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser. Please use a modern browser or select location manually on the map.');
      return;
    }

    setIsLoadingLocation(true);
    
    // Check if we're on HTTPS or localhost
    const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    if (!isSecure) {
      console.warn('Geolocation may not work on HTTP. Consider using HTTPS or localhost.');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        
        console.log('Location obtained:', newLocation);
        
        setUserLocation(newLocation);
        setMapCenter([latitude, longitude]);
        setSelectedLocation(newLocation);
        setFormData(prev => ({
          ...prev,
          coordinates: newLocation
        }));
        
        // Reverse geocoding to get address
        reverseGeocode(latitude, longitude);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Location access was denied. Please allow location access in your browser settings and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable. Please check your GPS/network connection.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += 'An unknown error occurred. Please select location manually on the map.';
            break;
        }
        
        alert(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        setFormData(prev => ({
          ...prev,
          location: data.display_name
        }));
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
  };

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const newLocation = { lat, lng };
    
    setSelectedLocation(newLocation);
    setFormData(prev => ({
      ...prev,
      coordinates: newLocation
    }));
    
    // Reverse geocoding for clicked location
    reverseGeocode(lat, lng);
  };

  // Component for handling map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const errors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!formData.issueType) {
          errors.issueType = 'Please select an issue type';
        }
        break;
      case 2:
        if (!formData.location.trim()) {
          errors.location = 'Please enter a location or select on the map';
        }
        if (!selectedLocation || (selectedLocation.lat === 0 && selectedLocation.lng === 0)) {
          errors.coordinates = 'Please select a location on the map';
        }
        break;
      case 3:
        if (!formData.description.trim()) {
          errors.description = 'Please provide a description of the issue';
        }
        break;
      case 4:
        if (!formData.contactInfo.name.trim()) {
          errors.name = 'Please enter your full name';
        }
        if (!formData.contactInfo.email.trim()) {
          errors.email = 'Please enter your email address';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    setValidationErrors({});
  };

  const handleSignIn = () => {
    const errors: {[key: string]: string} = {};
    
    if (!authData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!authData.password.trim()) {
      errors.password = 'Please enter your password';
    }
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      // Simulate authentication
      setIsAuthenticated(true);
      alert('Signed in successfully!');
    }
  };

  const submitReport = () => {
    // Handle form submission
    const reportData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9)
    };
    console.log('Submitting report:', reportData);
    alert('Report submitted successfully! You will receive updates via email.');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== Hero Section ===== */}
      <section className="bg-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Report Issues on Your Mobile Phone
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Help make your community better by reporting local issues quickly and easily. Your report will be sent directly to the appropriate city department.
            </p>
            
            {/* Mobile App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-teal-500 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 transition inline-flex items-center gap-2">
                <span className="text-2xl">📱</span>
                Download on the App Store
              </button>
              <button className="bg-white text-teal-500 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 transition inline-flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                GET IT ON Google Play
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Report Form Section ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-6">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-1 ml-3 ${
                      step < currentStep ? 'bg-teal-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              <span className="text-sm text-slate-600">Issue Type</span>
              <span className="text-sm text-slate-600">Location</span>
              <span className="text-sm text-slate-600">Details</span>
              <span className="text-sm text-slate-600">Contact</span>
              <span className="text-sm text-slate-600">Sign In</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Step 1: Issue Type */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">What type of issue are you reporting?</h2>
                {validationErrors.issueType && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{validationErrors.issueType}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {issueTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('issueType', type.id)}
                      className={`p-4 rounded-lg border-2 transition ${
                        formData.issueType === type.id
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium text-slate-700">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Where is the issue located?</h2>
                {(validationErrors.location || validationErrors.coordinates) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    {validationErrors.location && <p className="text-red-600 text-sm">{validationErrors.location}</p>}
                    {validationErrors.coordinates && <p className="text-red-600 text-sm">{validationErrors.coordinates}</p>}
                  </div>
                )}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address or Location Description
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter the address or describe the location..."
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        validationErrors.location ? 'border-red-300' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  
                  {/* Interactive Map */}
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="text-teal-500" size={24} />
                        <h3 className="font-semibold text-slate-900">Select Location on Map</h3>
                      </div>
                      <button 
                        onClick={getCurrentLocation}
                        disabled={isLoadingLocation}
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                      >
                        {isLoadingLocation ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Getting Location...
                          </>
                        ) : (
                          <>
                            <Locate size={16} />
                            Get Current Location
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-slate-600 mb-4">
                      Click on the map to select the exact location of the issue, or use your current location.
                    </p>
                    
                    {/* Location Help */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Location Tips:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>Click on map:</strong> Click anywhere on the map to select the issue location</li>
                        <li>• <strong>Current location:</strong> Allow browser location access when prompted</li>
                        <li>• <strong>Manual entry:</strong> Type the address in the text field above</li>
                        <li>• <strong>Mobile users:</strong> Make sure location services are enabled</li>
                      </ul>
                    </div>
                    
                    {/* Map Container */}
                    <div className="h-80 w-full rounded-lg overflow-hidden border border-slate-300">
                      <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler />
                        
                        {/* User's current location marker */}
                        {userLocation && (
                          <Marker position={[userLocation.lat, userLocation.lng]}>
                            <Popup>
                              <div className="text-center">
                                <p className="font-semibold">Your Current Location</p>
                                <p className="text-sm text-slate-600">
                                  {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                                </p>
                              </div>
                            </Popup>
                          </Marker>
                        )}
                        
                        {/* Selected location marker */}
                        {selectedLocation && (
                          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                            <Popup>
                              <div className="text-center">
                                <p className="font-semibold">Issue Location</p>
                                <p className="text-sm text-slate-600">
                                  {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                                </p>
                              </div>
                            </Popup>
                          </Marker>
                        )}
                      </MapContainer>
                    </div>
                    
                    {selectedLocation && (
                      <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                        <p className="text-sm text-teal-800">
                          <strong>Selected Location:</strong> {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                        </p>
                      </div>
                    )}
                    
                    {/* Debug Information */}
                    <div className="mt-4 p-3 bg-slate-100 border border-slate-300 rounded-lg">
                      <details className="text-sm">
                        <summary className="font-semibold text-slate-700 cursor-pointer">Debug Information</summary>
                        <div className="mt-2 space-y-1 text-slate-600">
                          <p><strong>Protocol:</strong> {window.location.protocol}</p>
                          <p><strong>Hostname:</strong> {window.location.hostname}</p>
                          <p><strong>Geolocation Support:</strong> {navigator.geolocation ? '✅ Supported' : '❌ Not Supported'}</p>
                          <p><strong>Secure Context:</strong> {window.isSecureContext ? '✅ Yes' : '❌ No'}</p>
                          <p><strong>User Agent:</strong> {navigator.userAgent.split(' ')[0]}</p>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Provide more details</h2>
                {validationErrors.description && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{validationErrors.description}</p>
                  </div>
                )}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        validationErrors.description ? 'border-red-300' : 'border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'low', label: 'Low', color: 'green', desc: 'Minor issue' },
                        { id: 'medium', label: 'Medium', color: 'yellow', desc: 'Moderate issue' },
                        { id: 'high', label: 'High', color: 'red', desc: 'Urgent issue' }
                      ].map((level) => (
                        <button
                          key={level.id}
                          onClick={() => handleInputChange('urgency', level.id)}
                          className={`p-4 rounded-lg border-2 transition ${
                            formData.urgency === level.id
                              ? `border-${level.color}-500 bg-${level.color}-50`
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`text-${level.color}-500 font-bold text-lg`}>{level.label}</div>
                          <div className="text-sm text-slate-600">{level.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                        <p className="text-slate-600">Click to upload photos or drag and drop</p>
                        <p className="text-sm text-slate-500">PNG, JPG up to 10MB each</p>
                      </label>
                    </div>
                    
                    {formData.photos.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                <p className="text-slate-600 mb-6">
                  Provide your contact details so we can keep you updated on the progress of your report.
                </p>
                {(validationErrors.name || validationErrors.email) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    {validationErrors.name && <p className="text-red-600 text-sm">{validationErrors.name}</p>}
                    {validationErrors.email && <p className="text-red-600 text-sm">{validationErrors.email}</p>}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.contactInfo.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        validationErrors.name ? 'border-red-300' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        validationErrors.email ? 'border-red-300' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.contactInfo.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Sign In */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Sign In to Submit Report</h2>
                <p className="text-slate-600 mb-6">
                  Please sign in to submit your report. This helps us track and follow up on your issue.
                </p>
                {(validationErrors.email || validationErrors.password) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    {validationErrors.email && <p className="text-red-600 text-sm">{validationErrors.email}</p>}
                    {validationErrors.password && <p className="text-red-600 text-sm">{validationErrors.password}</p>}
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={authData.email}
                      onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        validationErrors.email ? 'border-red-300' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={authData.password}
                      onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        validationErrors.password ? 'border-red-300' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Don't have an account?</h4>
                    <p className="text-blue-800 text-sm mb-3">
                      You can create a new account or continue as a guest. Guest reports will be tracked via email.
                    </p>
                    <div className="flex gap-3">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm">
                        Create Account
                      </button>
                      <button 
                        onClick={() => setIsAuthenticated(true)}
                        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm"
                      >
                        Continue as Guest
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition inline-flex items-center gap-2"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : currentStep === 5 && !isAuthenticated ? (
                <button
                  onClick={handleSignIn}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition inline-flex items-center gap-2"
                >
                  Sign In
                  <CheckCircle size={16} />
                </button>
              ) : (
                <button
                  onClick={submitReport}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition inline-flex items-center gap-2"
                >
                  Submit Report
                  <CheckCircle size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Report with <span className="text-teal-500">Samaadhan</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our platform makes it easy to report issues and track their resolution, ensuring your voice is heard and your community improves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-teal-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick & Easy</h3>
              <p className="text-slate-600">
                Report issues in under 2 minutes with our streamlined process and mobile-friendly interface.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Track Progress</h3>
              <p className="text-slate-600">
                Get real-time updates on your report status and see when issues are resolved in your community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Make Impact</h3>
              <p className="text-slate-600">
                Join thousands of citizens who are making their communities better, one report at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer Section ===== */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Solutions For</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Government</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Tools For</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Developers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Find Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">X</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Who We Are</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Jobs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Help</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2023 Samaadhan. All rights reserved. - Terms of Use
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Language:</span>
              <select className="bg-transparent text-slate-400 border-none focus:outline-none">
                <option>English (English)</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
