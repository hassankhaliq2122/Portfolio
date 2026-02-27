import React, { useState, useRef } from "react";
import { Check, ArrowLeft, Loader2, ArrowUpRight, Star } from "lucide-react";
import "./ContactUs.css";
import Header from "../components/Header";
// Import SVG icons from contactUs folder
import PenIcon from "../assets/contactUs/pen.svg";
import BookIcon from "../assets/contactUs/book.svg";
import Book2Icon from "../assets/contactUs/book2.svg";
import RecycleIcon from "../assets/contactUs/recycle.svg";
import EmoIcon from "../assets/contactUs/emo.svg";
import PixelCards from "../components/PixelCards";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://portfolio-backend-production-a954.up.railway.app";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// ServiceCard component with ref for PixelCards hover detection
const ServiceCard = ({ service, isSelected, onSelect }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      className={`service-card ${isSelected ? "selected" : ""}`}
    >
      {/* Badge */}
      {service.badge && <span className="service-badge">{service.badge}</span>}

      {/* Selection Circle */}
      <div className={`selection-circle ${isSelected ? "selected" : ""}`}>
        {isSelected && <Check className="check-icon" />}
      </div>

      {/* PixelCards effect - pass cardRef for hover detection */}
      <PixelCards cardRef={cardRef} />

      {/* Icon */}
      <div className="service-icon">
        <img src={service.icon} alt={service.title} />
      </div>

      {/* Content */}
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
    </div>
  );
};

const ContactUs = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    service: "",
    hasWebsite: null,
    websiteUrl: "",
    businessType: "",
    budget: "",
    timeline: "",
    projectGoals: "",
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
  });

  const steps = [
    { number: 1, label: "Service Selection" },
    { number: 2, label: "Website Context" },
    { number: 3, label: "Project Scope" },
    { number: 4, label: "Let's Connect" },
    { number: 5, label: "Finish" },
  ];

  const services = [
    {
      id: "design",
      title: "Website Design",
      description:
        "When you need only website designs in Figma/XD/Framer or other tool.",
      icon: PenIcon,
    },
    {
      id: "development",
      title: "Website Development",
      description:
        "When you already have website design and need to develop it.",
      icon: BookIcon,
    },
    {
      id: "design-dev",
      title: "Website (Design+ Dev)",
      description:
        "When you need to build website from scratch (Design & Development).",
      icon: Book2Icon,
      badge: "Most Selected",
    },
    {
      id: "revamp",
      title: "Revamp / Improvement",
      description:
        "When you already have website and need to revamp it completely.",
      icon: RecycleIcon,
    },
    {
      id: "not-sure",
      title: "Not sure yet",
      description:
        "Don't be shy. Let's our team help and find what do you need exactly.",
      icon: EmoIcon,
    },
  ];

  const businessTypes = [
    {
      id: "startup",
      title: "Startup",
      description:
        "Early-stage or growing fast — focused on launching, validating, or scaling.",
    },
    {
      id: "small-medium",
      title: "Small / Medium Business",
      description:
        "An established business looking to improve online presence and conversions.",
    },
    {
      id: "small-medium-2",
      title: "Small / Medium Business",
      description:
        "An established business looking to improve online presence and conversions.",
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description:
        "Large organization with complex needs, processes, and high expectations.",
    },
    {
      id: "agency",
      title: "Agency",
      description:
        "A creative or digital agency seeking a reliable development partner.",
    },
    {
      id: "other",
      title: "Other",
      description:
        "If none of the above fit, tell us a bit more about your business.",
    },
  ];

  const budgetRanges = [
    { id: "$2k - $5k", label: "$2k - $5k" },
    { id: "$5k - $10k", label: "$5k - $10k" },
    { id: "$10k - $20k", label: "$10k - $20k" },
    { id: "$20k+", label: "$20k+" },
    { id: "Not sure yet", label: "Not sure yet" },
  ];

  const timelines = [
    { id: "Immediately", label: "Immediately" },
    { id: "In 1-2 months", label: "In 1-2 months" },
    { id: "Flexible", label: "Flexible" },
  ];

  const handleServiceSelect = (serviceId) => {
    setFormData({ ...formData, service: serviceId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Map form data to Lead API format
      const leadPayload = {
        name: formData.fullName,
        email: formData.email,
        company: formData.companyName,
        country: formData.country,
        budgetRange: formData.budget,
        projectType: formData.service,
        message:
          formData.projectGoals ||
          `Service: ${formData.service}, Business: ${formData.businessType}, Timeline: ${formData.timeline}`,
      };

      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setIsSubmitted(true);
      setCurrentStep(5);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      handleSubmit();
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Let's Start With The Basics",
          subtitle:
            "Tell us what you're looking for — we'll take it from there.",
        };
      case 2:
        return {
          title: "About Your Business",
          subtitle:
            "A little context helps us understand your world and your goals.",
        };
      case 3:
        return {
          title: "Project Scope & Timing",
          subtitle:
            "This helps us align on scope, timeline, and expectations from day one.",
        };
      case 4:
        return {
          title: "Let's Connect",
          subtitle:
            "Tell us how to reach you. We'll follow up shortly to schedule a call.",
        };
      case 5:
        return {
          title: "Thank You!",
          subtitle:
            "We've received your information and will be in touch soon.",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1:
        return "Continue: Website Context";
      case 2:
        return "Continue: Project Scope";
      case 3:
        return "Continue: Let's Connect";
      case 4:
        return "Start My Project";
      default:
        return "Continue";
    }
  };

  const { title, subtitle } = getStepContent();

  return (
    <>
      <Header />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-card">
            {/* Header Content */}
            {currentStep < 5 && (
              <>
                <div className="contactUs-header-group">
                  {currentStep > 1 && !isSubmitted && (
                    <button
                      onClick={handleBack}
                      className="back-arrow-btn"
                      aria-label="Go back"
                    >
                      <ArrowLeft size={24} />
                    </button>
                  )}
                  <h1 className="contactUs-title">{title}</h1>
                </div>
                <p
                  className={`contactUs-subtitle ${currentStep > 1 && !isSubmitted ? "indented" : ""}`}
                >
                  {subtitle}
                </p>

                {/* Step Indicator */}
                <div className="steps-indicator">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      <div
                        className={`step-item ${
                          currentStep > step.number
                            ? "completed"
                            : currentStep === step.number
                              ? "active"
                              : "pending"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <Check className="check-icon" />
                        ) : (
                          <span>{step.number}</span>
                        )}
                        <span>{step.label}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`step-connector ${
                            currentStep > step.number ? "completed" : ""
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}

            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <>
                <h2 className="section-title">What Can We Help You With?</h2>
                <div className="services-grid">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={formData.service === service.id}
                      onSelect={() => handleServiceSelect(service.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Step 2: Website Context */}
            {currentStep === 2 && (
              <>
                {/* Website Question */}
                <h2 className="section-title">
                  Do You Already Have A Website?
                </h2>
                <div className="website-options">
                  {/* No Website */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, hasWebsite: false })
                    }
                    className={`website-card ${
                      formData.hasWebsite === false ? "selected" : ""
                    }`}
                  >
                    <div className="website-card-header">
                      <div className="website-card-content">
                        <h3 className="website-card-title">
                          No, I don't have website
                        </h3>
                        <p className="website-card-desc">
                          I need a website from scratch to increase leads,
                          elevate business reputation and boost revenue.
                        </p>
                      </div>
                      <div
                        className={`selection-circle ${
                          formData.hasWebsite === false ? "selected" : ""
                        }`}
                      >
                        {formData.hasWebsite === false && (
                          <Check className="check-icon" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Yes Website */}
                  <div
                    onClick={() =>
                      setFormData({ ...formData, hasWebsite: true })
                    }
                    className={`website-card ${
                      formData.hasWebsite === true ? "gradient-border" : ""
                    }`}
                  >
                    <div className="website-card-header">
                      <h3 className="website-card-title">Yes, I've website</h3>
                      <div
                        className={`selection-circle ${
                          formData.hasWebsite === true ? "selected" : ""
                        }`}
                        style={
                          formData.hasWebsite === true
                            ? { background: "#2C65E1", borderColor: "#2C65E1" }
                            : {}
                        }
                      >
                        {formData.hasWebsite === true && (
                          <Check className="check-icon" />
                        )}
                      </div>
                    </div>
                    {formData.hasWebsite === true && (
                      <input
                        type="url"
                        placeholder="Enter Website URL (https://www.website.com)"
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            websiteUrl: e.target.value,
                          })
                        }
                        className="website-url-input"
                      />
                    )}
                  </div>
                </div>

                {/* Business Type */}
                <h2 className="section-title">
                  What Best Describes Your Business?
                </h2>
                <div className="business-grid">
                  {businessTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() =>
                        setFormData({ ...formData, businessType: type.id })
                      }
                      className={`business-card ${
                        formData.businessType === type.id ? "selected" : ""
                      }`}
                    >
                      <div className="business-card-header">
                        <div>
                          <h3 className="business-card-title">{type.title}</h3>
                          <p className="business-card-desc">
                            {type.description}
                          </p>
                        </div>
                        <div
                          className={`selection-circle ${
                            formData.businessType === type.id ? "selected" : ""
                          }`}
                          style={
                            formData.businessType === type.id
                              ? {
                                  background: "#2C65E1",
                                  borderColor: "#2C65E1",
                                }
                              : {}
                          }
                        >
                          {formData.businessType === type.id && (
                            <Check className="check-icon" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 3: Project Scope */}
            {currentStep === 3 && (
              <>
                {/* Budget Range */}
                <h2 className="section-title">
                  What Is Your Estimated Budget Range?
                </h2>
                <div className="budget-options">
                  {budgetRanges.map((range) => (
                    <div
                      key={range.id}
                      onClick={() =>
                        setFormData({ ...formData, budget: range.id })
                      }
                      className={`budget-option ${
                        formData.budget === range.id ? "selected" : ""
                      }`}
                    >
                      <span>{range.label}</span>
                      <div
                        className={`budget-radio ${
                          formData.budget === range.id ? "selected" : ""
                        }`}
                      >
                        {formData.budget === range.id && (
                          <div className="budget-radio-inner" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <h2 className="section-title">
                  When Are You Looking To Start?
                </h2>
                <div className="budget-options">
                  {timelines.map((timeline) => (
                    <div
                      key={timeline.id}
                      onClick={() =>
                        setFormData({ ...formData, timeline: timeline.id })
                      }
                      className={`budget-option ${
                        formData.timeline === timeline.id ? "selected" : ""
                      }`}
                    >
                      <span>{timeline.label}</span>
                      <div
                        className={`budget-radio ${
                          formData.timeline === timeline.id ? "selected" : ""
                        }`}
                      >
                        {formData.timeline === timeline.id && (
                          <div className="budget-radio-inner" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 4: Contact Details */}
            {currentStep === 4 && (
              <div className="contact-details-step">
                <h2 className="section-title">
                  Tell Us Briefly About Your Project Or Goals
                </h2>
                <textarea
                  name="projectGoals"
                  placeholder="We want a modern website that converts visitors into leads..."
                  value={formData.projectGoals}
                  onChange={handleInputChange}
                  className="project-goals-textarea"
                />

                <h2 className="section-title">Contact Details</h2>
                <div className="contact-details-grid">
                  <div className="input-field">
                    <label>
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>
                      Email <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 123 456 789"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-field">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Enter Company Name (Apple)"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-field">
                    <label>
                      Country <span className="required-star">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="country-select"
                    >
                      <option value="">Select your country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="submit-error">{submitError}</div>
                )}
              </div>
            )}

            {/* Success Message (Step 5) */}
            {currentStep === 5 && (
              <div className="finish-container">
                <div className="finish-icon">
                  <Check
                    className="check-icon-large"
                    color="#ffffff"
                    strokeWidth={3}
                  />
                </div>
                <h2 className="finish-title">Thank You!</h2>
                <p className="finish-desc">
                  We've received your information and will be in touch
                  <br />
                  within 24 hours to discuss your project.
                </p>

                <a href="/" className="go-home-btn">
                  Go to Home Page <ArrowUpRight size={18} />
                </a>

                <div className="testimonial-section">
                  <h3 className="testimonial-title">What Our Clients Say</h3>

                  <div className="testimonial-stars-container">
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill="#D8E12B"
                          color="#D8E12B"
                        />
                      ))}
                    </div>
                    <span className="testimonial-niche">
                      (Luxury Business Website)
                    </span>
                  </div>

                  <p className="testimonial-quote">
                    “Metatrybe perfectly combined premium design aesthetics with
                    strategic thinking. The result was a luxury website that
                    truly represents our brand.”
                  </p>

                  <div className="testimonial-author">
                    <h4>Darbpay</h4>
                    <p>B2B AI SaaS, KSA</p>
                  </div>
                </div>
              </div>
            )}

            {/* Continue Button */}
            {currentStep < 5 && (
              <div className="continue-button-wrapper">
                <button
                  onClick={handleNext}
                  className="continue-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    getButtonText()
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
