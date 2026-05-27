import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission (replace with EmailJS or backend API)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      setSubmitStatus('Thank you! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    await new Promise(resolve => setTimeout(resolve, 3000)); // Keep message for a while
      setSubmitStatus('');

    
    } catch (error) {
      setSubmitStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions about EduAitor? We're here to help. Reach out via form, call, email, or WhatsApp.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Form Section */}
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Phone number"
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    placeholder="Your city"
                  />
                  {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Tell us more about your query..."
                />
                {errors.message && <p className="error-message">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <svg className="spinner" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path fill="none" stroke="currentColor" strokeWidth="4" d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus && (
                <div className={`status-message ${submitStatus.includes('Thank you') ? 'success' : 'error'}`}>
                  {submitStatus}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Map Section */}
          <div className="contact-info-section">
            <div className="quick-contacts">
              <h3 className="quick-contacts-title">Reach Us Directly</h3>
              <div className="contacts-list">
                <a href="tel:+919999999999" className="contact-item">
                  <div className="contact-icon phone-icon">
                    <svg viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-type">Phone</p>
                    <p>+91 7230060069</p>
                  </div>
                </a>

                <a href="mailto:eduaitor.connect@gmail.com" className="contact-item">
                  <div className="contact-icon email-icon">
                    <svg viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-type">Email</p>
                    <p>eduaitor.connect@gmail.com</p>
                  </div>
                </a>

                <a href="https://wa.me/7230060069" target="_blank" rel="noopener noreferrer" className="contact-item whatsapp-item">
                  <div className="contact-icon whatsapp-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-type">WhatsApp</p>
                    <p>Chat with us now</p>
                  </div>
                </a>

                <div className="contact-item address-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" className="location-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="contact-type">Address</p>
                    <p>E05, 2nd Floor, Capital Hi-Street Mall, Jagatpura, Jaipur-302017</p>
                  </div>
                </div>
              </div>
            </div>

           <div className="map-section">
  <h4 className="map-title">📍 Eduaitor Office</h4>
  <div className="map-container">
    {/* <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3559.94933885605!2d75.8070195!3d26.8415636!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db608284ff2c7%3A0x32674c206240ee90!2sGempulse%20Infotech%20Pvt%20ltd!5e0!3m2!1sen!2sin!4v1771046322128!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Gempulse Infotech Pvt Ltd Location"
    /> */}
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.278148531799!2d75.85807799999999!3d26.799270699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9d6f000be8f%3A0x96781e9898265140!2sRTech%20Capital%20Highstreet%20Jaipur!5e0!3m2!1sen!2sin!4v1778143291225!5m2!1sen!2sin"
      allowFullScreen="" loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade" 
      title='Eduaitor Office' />
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
