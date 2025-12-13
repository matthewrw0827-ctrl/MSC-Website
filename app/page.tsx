"use client"

import { useEffect, useState } from "react"

export default function HomePage() {
  useEffect(() => {
    // Force video autoplay on all devices
    const video = document.querySelector("video")
    if (video) {
      // Remove any controls that might appear
      video.controls = false
      video.setAttribute("webkit-playsinline", "true")
      video.setAttribute("playsinline", "true")
      video.setAttribute("muted", "true")
      video.muted = true

      // Force play with multiple attempts
      const attemptPlay = async () => {
        try {
          await video.play()
          console.log("Video playing successfully")
        } catch (error) {
          console.log("Video autoplay blocked by browser")
        }
      }

      // Try to play immediately
      attemptPlay()

      // Also try when video metadata loads
      video.addEventListener("loadedmetadata", attemptPlay)
      video.addEventListener("canplay", attemptPlay)
      video.addEventListener("loadeddata", attemptPlay)
      
      // Try on user interaction (mobile workaround)
      const handleUserInteraction = () => {
        attemptPlay()
        document.removeEventListener("touchstart", handleUserInteraction)
        document.removeEventListener("click", handleUserInteraction)
      }
      
      document.addEventListener("touchstart", handleUserInteraction)
      document.addEventListener("click", handleUserInteraction)
    }
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const errorData = await response.json()
        setSubmitStatus('error')
        setErrorMessage(errorData.error || 'Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      <header className="absolute top-0 left-0 z-50 p-4 sm:p-6">
        <h1
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight"
          style={{ 
            fontFamily: "'Perpetua', 'Perpetua Titling MT', 'EB Garamond', 'Times New Roman', serif",
            textShadow: "2px 4px 10px rgba(0,0,0,0.9), 0px 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          <span className="hidden sm:inline"> </span>
          <span className="sm:hidden"> </span>
        </h1>
      </header>

      {/* Desktop Navigation */}
      <nav className="absolute top-0 right-0 z-50 p-3 sm:p-6 hidden sm:block">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection("about")}
            className="text-white font-medium hover:text-accent transition-colors text-sm sm:text-base"
            style={{ textShadow: "1px 2px 4px rgba(0,0,0,0.8)" }}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("approach")}
            className="text-white font-medium hover:text-accent transition-colors text-sm sm:text-base"
            style={{ textShadow: "1px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Approach
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-white font-medium hover:bg-white/30 transition-all text-sm sm:text-base"
            style={{ textShadow: "1px 2px 4px rgba(0,0,0,0.8)" }}
          >
            Contact
          </button>
        </div>
      </nav>


      {/* Hero Section with Video Background */}
      <div
        className="relative w-full h-screen overflow-hidden"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Desktop Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          poster="/tel-aviv-coastline-new.jpg"
          webkit-playsinline
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portrait"
          disablePictureInPicture
          disableRemotePlayback
          data-setup="{}"
          className="video-background hidden sm:block"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
            objectPosition: "40% center",
            zIndex: 1,
            pointerEvents: "none",
            outline: "none",
            border: "none",
          }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/hlmandn981pjq57yz6r92/18809689-uhd_3840_2160_30fps.mp4?rlkey=pgng7qblvtxs8uoji937d69g0&st=d1wenn6x&dl=1"
            type="video/mp4"
          />
          <span style={{ color: "#F7F6F3" }}>Your browser does not support the video tag.</span>
        </video>
        
        {/* Mobile Static Image */}
        <div
          className="block sm:hidden"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/tel-aviv-coastline-new.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "40% center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            maxWidth: "90%",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4rem)",
              margin: 0,
              color: "#FFFFFF",
              fontWeight: "bold",
              lineHeight: "1.1",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
              padding: "0 1rem",
            }}
          >
            Strategic Advisory for Investment in Israeli Football
          </h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">Who We Are</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4">
              Mosaic Sport Capital is a private advisory boutique focused on guiding Israeli football clubs through investment exploration, ownership transitions, and strategic partnership processes. We work closely with ownership groups and executives seeking structured, discreet, and informed support as they engage with prospective investors.
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4">
              Our advantage lies in our understanding of both the Israeli football landscape and the global Jewish communities that care deeply about its future. We bring a culturally informed perspective, paired with analytical rigor and international familiarity, allowing us to bridge conversations that are often difficult for clubs to initiate or manage alone.
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4">
              We prioritize long-term alignment, disciplined preparation, and clear communication to ensure that any potential investment is approached thoughtfully and strategically.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="bg-background/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="/DanPhoto.jpg" 
                    alt="Daniel Mezistrano" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 25%" }}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1 sm:mb-2">Daniel Mezistrano</h3>
                  <p className="text-primary font-medium text-sm sm:text-base">Co-Founder</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                Daniel works across strategy, governance, and stakeholder coordination within football and institutional environments. In addition to operational leadership roles across multiple organizations, he brings extensive relationships and deep familiarity with American Jewish communal networks, informed by years of involvement across institutions such as BBYO, JNF, and other national Jewish leadership bodies. This background gives him a rare ability to navigate diaspora engagement, investor alignment, and cross-cultural stakeholder management. He is currently studying at Washington University in St. Louis.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <a
                  href="mailto:dan.mezistrano@mosaicsportcapital.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium break-all">dan.mezistrano@mosaicsportcapital.com</span>
                </a>
              </div>
            </div>

            <div className="bg-background/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="/Matthew.Photo.jpg" 
                    alt="Matthew Walzer" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 8%", transform: "scale(1.6)" }}
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1 sm:mb-2">Matthew Walzer</h3>
                  <p className="text-primary font-medium text-sm sm:text-base">Co-Founder</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                Matthew focuses on cross-border football transactions, valuation work, and investor–club analysis. Through leading Students for International Football Finance, an international organization that collaborates with advisory firms and investors, he has worked closely with BlackBridge Sports and Matix Capital on M&A research, deal preparation, valuation analysis, and strategic market mapping. His experience includes supporting transaction research, facilitating investor–operator communication, and contributing to assessments of club acquisition and ownership structures. He is currently studying at Bocconi University in Milan.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <a
                  href="mailto:matthew.walzer@mosaicsportcapital.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium break-all">matthew.walzer@mosaicsportcapital.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-12 sm:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">Approach</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
              Our process is structured to ensure thorough preparation, strategic alignment, and thoughtful execution at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8" style={{ gridAutoRows: '1fr' }}>
            <div className="bg-card/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-4 sm:mb-6">Step 1: Evaluation and Understanding</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                We begin by developing a clear picture of the club's financial position, operational context, and strategic objectives. This early assessment allows us to understand ownership priorities, constraints, and the types of investors who may be the right fit.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <li>• Clarification of goals, expectations, and sensitivities</li>
                <li>• Initial identification of aligned investor profiles</li>
              </ul>
            </div>

            <div className="bg-card/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-4 sm:mb-6">Step 2: Preparation and Positioning</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                Before engaging investors, we prepare structured materials and organize the information needed to present the club clearly and professionally. This ensures early conversations begin from a position of clarity, credibility, and alignment.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <li>• Strategic narrative and positioning</li>
                <li>• Organized financial and operational information</li>
              </ul>
            </div>

            <div className="bg-card/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-4 sm:mb-6">Step 3: Targeted Outreach</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                We conduct discreet, direct outreach through private channels, focusing on investors who match the club's objectives and long-term vision. All outreach is curated, confidential, and based on pre-established alignment.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <li>• Confidential engagement through trusted networks</li>
                <li>• Curated introductions and early interest assessment</li>
              </ul>
            </div>

            <div className="bg-card/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-4 sm:mb-6">Step 4: Facilitation and Support</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                As interest develops, we structure conversations and support ownership in evaluating proposals, potential structures, and long-term implications. Our role is to keep discussions productive, organized, and aligned with the club's priorities.
              </p>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <li>• Management of communication flow and prioritization</li>
                <li>• Assessment of proposals, structure, and long-term fit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">Contact Us</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            If you would like to discuss potential investment or partnership considerations in Israeli football, please reach out.
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-border/50">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ Message sent successfully! We'll get back to you soon.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ✗ {errorMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Reason for contacting us"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center">
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">Or reach us directly:</p>
              <div>
                <a
                  href="mailto:contact@mosaicsportcapital.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base break-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contact@mosaicsportcapital.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground px-4">
            Mosaic Sport Capital LLC is a private advisory firm. Inquiries and engagements are handled discreetly and by
            invitation.
          </p>
        </div>
      </footer>
    </div>
  )
}
