"use client"

import { useEffect } from "react"

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      <header className="absolute top-0 left-0 z-50 p-3 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
            <img 
              src="/Mosaic Logo.png" 
              alt="Mosaic Sport Capital Logo" 
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
            />
          </div>
          <div>
            <h1
              className="text-lg sm:text-2xl font-serif font-bold text-white"
              style={{ textShadow: "2px 4px 8px rgba(0,0,0,0.8)" }}
            >
              Mosaic Sport Capital
            </h1>
          </div>
        </div>
      </header>

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
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
          disablePictureInPicture
          disableRemotePlayback
          playsinline="true"
          data-setup="{}"
          className="video-background hidden sm:block"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "40% center",
            zIndex: 1,
            pointerEvents: "none",
            outline: "none",
            border: "none",
          }}
        >
          <source
            src="https://www.dropbox.com/scl/fi/hlmandn981pjq57yz6r92/18809689-uhd_3840_2160_30fps.mp4?rlkey=YOUR_KEY&dl=1"
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
              textShadow: "2px 4px 12px rgba(0,0,0,0.8), 0px 2px 4px rgba(0,0,0,0.6)",
              padding: "0 1rem",
            }}
          >
            Connecting the diaspora to Israeli football.
          </h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <section id="about" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Who We Are</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">
              Mosaic Sport Capital is a private advisory boutique dedicated to facilitating strategic ownership in Israeli football. Founded by American Jewish entrepreneurs with a shared commitment to Israel, sport, and investment, we work with individuals who view club ownership as a long-term investment in both identity and
              infrastructure, one that strengthens Israeli sport as a whole. Our mission is to foster meaningful
              connections between global Jewish capital and enduring institutions in Israel, building vehicles for
              legacy, alignment, and sustained impact.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              We understand that some investments transcend numbers, they touch the soul.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-background/50 p-8 rounded-xl border border-border/50 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif font-bold text-white bg-primary w-full h-full rounded-full flex items-center justify-center">
                    D
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Daniel Mezistrano</h3>
                  <p className="text-primary font-medium">Co-Founder</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Daniel studies at Washington University in St. Louis pursuing a multidisciplinary education in Business
                and Jewish, Islamic & Middle Eastern Studies. He brings significant leadership experience within the
                global Jewish community, having served as Aleph Godol (International President) of BBYO and engaging
                with a plethora of Jewish non-profit organizations including JNF, AIPAC, ADL and more. His work sits at
                the intersection of Pluralistic Jewish engagement, institutional strategy, and community capital. He
                approaches every deal through the lens of alignment, development, and long-term cultural fit shaped by
                deep-rooted perspective.
              </p>
              <a
                href="https://www.linkedin.com/in/daniel-mezistrano-2531a024b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>

            <div className="bg-background/50 p-8 rounded-xl border border-border/50 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif font-bold text-white bg-primary w-full h-full rounded-full flex items-center justify-center">
                    M
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Matthew Walzer</h3>
                  <p className="text-primary font-medium">Co-Founder</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Matthew attends Bocconi University in Milan, one of Europe's premier institutions for economics and
                finance. He co-founded Students for International Football Finance (SIFF), the first student-led society
                in the field, giving him access to the football business space and building a global network of industry
                practitioners. He has worked directly on both buy-side and sell-side football transactions across
                European markets, supporting deal research, market mapping, and valuation modelling. His focus is on
                cross-border club acquisition, legacy asset positioning, and aligning capital with narrative.
              </p>

              <a
                href="https://www.linkedin.com/in/matthew-w-a32611275"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="approach" className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">How We Work</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three principles guide every engagement we undertake.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Discretion</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>• We don't promote mandates or publish opportunities online</p>
                  <p>• Everything moves through quiet, trusted, private introductions</p>
                  <p>• All conversations are confidential before, during, and after</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.5 12c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5-2-4.5-4.5-4.5S8.5 9.5 8.5 12z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12c0-2.5 2-4.5 4.5-4.5S12 9.5 12 12s-2 4.5-4.5 4.5S3 14.5 3 12z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Continuity</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>• Ownership carries memory, identity, and long-term strategic value</p>
                  <p>• We work with those who see legacy as active stewardship</p>
                  <p>• Clubs are treated as cultural assets, not just commodities</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Alignment</h3>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>• We partner with clients who share our values and vision</p>
                  <p>• Identity and intention are at the core of every deal</p>
                  <p>• We prioritize cultural fit over speed or transactional flash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Contact Us</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to explore opportunities in Israeli football? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your full name"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your@email.com"
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="We look forward to your message..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground mb-4">Or reach us directly:</p>
              <div className="space-y-2">
                <a
                  href="mailto:daniel.mezistrano@mosaicsportcapital.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  daniel.mezistrano@mosaicsportcapital.com
                </a>
                <br />
                <a
                  href="mailto:matthew.walzer@mosaicsportcapital.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  matthew.walzer@mosaicsportcapital.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="py-12 px-6 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Mosaic Sport Capital is a private advisory firm. Inquiries and engagements are handled discreetly and by
            invitation.
          </p>
        </div>
      </footer>
    </div>
  )
}
