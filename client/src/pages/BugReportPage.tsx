// src/pages/BugReportPage.tsx
import { useState } from 'react';
import { 
  Bug, 
  AlertTriangle, 
  Upload, 
  Send, 
  CheckCircle, 
  X,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon
} from 'lucide-react';

export function BugReportPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    severity: 'medium',
    device: 'desktop',
    browser: '',
    operatingSystem: '',
    attachments: [] as File[],
    contactEmail: '',
    priority: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const severityOptions = [
    { id: 'low', label: 'Low', color: 'green', description: 'Minor issue, workaround available' },
    { id: 'medium', label: 'Medium', color: 'yellow', description: 'Moderate issue, affects functionality' },
    { id: 'high', label: 'High', color: 'orange', description: 'Major issue, significant impact' },
    { id: 'critical', label: 'Critical', color: 'red', description: 'System breaking, immediate attention needed' }
  ];

  const deviceOptions = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'tablet', label: 'Tablet', icon: Tablet }
  ];

  const priorityOptions = [
    { id: 'low', label: 'Low Priority' },
    { id: 'normal', label: 'Normal Priority' },
    { id: 'high', label: 'High Priority' },
    { id: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      stepsToReproduce: '',
      expectedBehavior: '',
      actualBehavior: '',
      severity: 'medium',
      device: 'desktop',
      browser: '',
      operatingSystem: '',
      attachments: [],
      contactEmail: '',
      priority: 'normal'
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Bug Report Submitted!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for reporting this bug. Our development team will review it and get back to you within 24-48 hours.
            </p>
            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition"
              >
                Report Another Bug
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full border border-slate-300 text-slate-700 py-3 px-6 rounded-lg hover:bg-slate-50 transition"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bug className="text-red-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Report a <span className="text-teal-500">Bug</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Help us improve Samaadhan by reporting any technical issues you encounter. Your feedback is valuable to us.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="border-b border-slate-200 pb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-teal-500" size={20} />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bug Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Brief description of the bug"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bug Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the bug in detail..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Steps to Reproduce */}
            <div className="border-b border-slate-200 pb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                Steps to Reproduce
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Steps to Reproduce the Bug *
                  </label>
                  <textarea
                    required
                    value={formData.stepsToReproduce}
                    onChange={(e) => handleInputChange('stepsToReproduce', e.target.value)}
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Expected Behavior
                    </label>
                    <textarea
                      value={formData.expectedBehavior}
                      onChange={(e) => handleInputChange('expectedBehavior', e.target.value)}
                      placeholder="What should have happened?"
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Actual Behavior
                    </label>
                    <textarea
                      value={formData.actualBehavior}
                      onChange={(e) => handleInputChange('actualBehavior', e.target.value)}
                      placeholder="What actually happened?"
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="border-b border-slate-200 pb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Monitor className="text-blue-500" size={20} />
                Technical Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Device Type
                  </label>
                  <div className="space-y-2">
                    {deviceOptions.map((device) => {
                      const IconComponent = device.icon;
                      return (
                        <label key={device.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                          <input
                            type="radio"
                            name="device"
                            value={device.id}
                            checked={formData.device === device.id}
                            onChange={(e) => handleInputChange('device', e.target.value)}
                            className="text-teal-500"
                          />
                          <IconComponent size={20} className="text-slate-500" />
                          <span className="text-slate-700">{device.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Browser
                  </label>
                  <input
                    type="text"
                    value={formData.browser}
                    onChange={(e) => handleInputChange('browser', e.target.value)}
                    placeholder="e.g., Chrome 120, Firefox 119"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Operating System
                  </label>
                  <input
                    type="text"
                    value={formData.operatingSystem}
                    onChange={(e) => handleInputChange('operatingSystem', e.target.value)}
                    placeholder="e.g., Windows 11, macOS 14, Ubuntu 22.04"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Severity and Priority */}
            <div className="border-b border-slate-200 pb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} />
                Severity & Priority
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Severity Level
                  </label>
                  <div className="space-y-3">
                    {severityOptions.map((severity) => (
                      <label key={severity.id} className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                        <input
                          type="radio"
                          name="severity"
                          value={severity.id}
                          checked={formData.severity === severity.id}
                          onChange={(e) => handleInputChange('severity', e.target.value)}
                          className="text-teal-500 mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full bg-${severity.color}-500`}></span>
                            <span className="font-medium text-slate-900">{severity.label}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{severity.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Priority Level
                  </label>
                  <div className="space-y-3">
                    {priorityOptions.map((priority) => (
                      <label key={priority.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                        <input
                          type="radio"
                          name="priority"
                          value={priority.id}
                          checked={formData.priority === priority.id}
                          onChange={(e) => handleInputChange('priority', e.target.value)}
                          className="text-teal-500"
                        />
                        <span className="text-slate-700">{priority.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="pb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Upload className="text-purple-500" size={20} />
                Attachments (Optional)
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,.txt,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                    <p className="text-slate-600">Click to upload files or drag and drop</p>
                    <p className="text-sm text-slate-500">Images, videos, documents (max 10MB each)</p>
                  </label>
                </div>
                
                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-slate-700">Uploaded Files:</h3>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {file.type.startsWith('image/') ? (
                            <ImageIcon className="text-blue-500" size={20} />
                          ) : file.type.startsWith('video/') ? (
                            <Video className="text-purple-500" size={20} />
                          ) : (
                            <FileText className="text-slate-500" size={20} />
                          )}
                          <span className="text-slate-700">{file.name}</span>
                          <span className="text-sm text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Bug Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
          <p className="text-blue-800 mb-4">
            If you're experiencing a critical issue that's preventing you from using Samaadhan, please contact our support team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:support@samaadhan.com" className="text-blue-600 hover:text-blue-800 font-medium">
              📧 support@samaadhan.com
            </a>
            <a href="tel:+1-800-SAMAADHAN" className="text-blue-600 hover:text-blue-800 font-medium">
              📞 +1-800-SAMAADHAN
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
