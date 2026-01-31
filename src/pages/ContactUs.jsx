import React, { useState } from "react";
import { Check } from "lucide-react";
import "./ContactUs.css";
import Header from "../components/Header";
// Import SVG icons from contactUs folder
import PenIcon from "../assets/contactUs/pen.svg";
import BookIcon from "../assets/contactUs/book.svg";
import Book2Icon from "../assets/contactUs/book2.svg";
import RecycleIcon from "../assets/contactUs/recycle.svg";
import EmoIcon from "../assets/contactUs/emo.svg";
import darkVeil from "../assets/contactUs/dark-veil.webm";
const ContactUs = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    hasWebsite: null,
    websiteUrl: "",
    businessType: "",
    budget: "",
    timeline: "",
  });

  const steps = [
    { number: 1, label: "Service Selection" },
    { number: 2, label: "Website Context" },
    { number: 3, label: "Project Scope" },
    { number: 4, label: "Finish" },
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
    { id: "2k-5k", label: "$2k – $5k" },
    { id: "5k-10k", label: "$5k – $10k" },
    { id: "10k-20k", label: "$10k – $20k" },
    { id: "20k+", label: "$20k+" },
    { id: "not-sure", label: "Not sure yet" },
  ];

  const timelines = [
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

  const handleServiceSelect = (serviceId) => {
    setFormData({ ...formData, service: serviceId });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
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
          title: "Almost Done!",
          subtitle: "Thank you for your responses. We'll be in touch soon!",
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
        return "Continue: Finish";
      case 4:
        return "Submit";
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
            <h1 className="contactUs-title">{title}</h1>
            <p className="contactUs-subtitle">{subtitle}</p>

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

            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <>
                <h2 className="section-title">What Can We Help You With?</h2>
                <div className="services-grid">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`service-card ${
                        formData.service === service.id ? "selected" : ""
                      }`}
                    >
                      {/* Badge */}
                      {service.badge && (
                        <span className="service-badge">{service.badge}</span>
                      )}

                      {/* Selection Circle */}
                      <div
                        className={`selection-circle ${
                          formData.service === service.id ? "selected" : ""
                        }`}
                      >
                        {formData.service === service.id && (
                          <Check className="check-icon" />
                        )}
                      </div>

                      {/* Icon */}
                      <div className="service-icon">
                        <img src={service.icon} alt={service.title} />
                      </div>

                      {/* Content */}
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">
                        {service.description}
                      </p>
                    </div>
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
                <div className="timeline-grid">
                  {timelines.map((timeline) => (
                    <div
                      key={timeline.id}
                      onClick={() =>
                        setFormData({ ...formData, timeline: timeline.id })
                      }
                      className={`timeline-card ${
                        formData.timeline === timeline.id ? "selected" : ""
                      }`}
                    >
                      <div className="business-card-header">
                        <div>
                          <h3 className="business-card-title">
                            {timeline.title}
                          </h3>
                          <p className="business-card-desc">
                            {timeline.description}
                          </p>
                        </div>
                        <div
                          className={`selection-circle ${
                            formData.timeline === timeline.id ? "selected" : ""
                          }`}
                          style={
                            formData.timeline === timeline.id
                              ? {
                                  background: "#2C65E1",
                                  borderColor: "#2C65E1",
                                }
                              : {}
                          }
                        >
                          {formData.timeline === timeline.id && (
                            <Check className="check-icon" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 4: Finish */}
            {currentStep === 4 && (
              <div className="finish-container">
                <div className="finish-icon">
                  <Check className="check-icon-large" />
                </div>
                <h2 className="finish-title">Thank You!</h2>
                <p className="finish-desc">
                  We've received your information and will be in touch within 24
                  hours to discuss your project.
                </p>
              </div>
            )}

            {/* Continue Button */}
            <div className="continue-button-wrapper">
              <button onClick={handleNext} className="continue-button">
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
