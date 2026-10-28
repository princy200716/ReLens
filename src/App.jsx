
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Glasses3D from './Glasses3D'
import './App.css'

const lensOptions = [
  { id: 'clear', name: 'Clear Vision', description: 'Prescription lens option', color: '#c8edf0', swatch: 'clear' },
  { id: 'sun', name: 'Sun Mode', description: 'Tinted outdoor lens option', color: '#263746', swatch: 'sun' },
  { id: 'blue', name: 'Screen Mode', description: 'Blue-light-filtering option', color: '#6d9acb', swatch: 'blue' },
  { id: 'photo', name: 'Photochromic', description: 'Light-responsive lens option', color: '#8d79c2', swatch: 'photo' },
]

const frameOptions = [
  { id: 'black', name: 'Midnight Black', color: '#20252d' },
  { id: 'silver', name: 'Titanium Silver', color: '#526d80' },
  { id: 'cyan', name: 'Ocean Cyan', color: '#22c8c3' },
]

const demoSections = [
  {
    title: 'Welcome to ReLens',
    description: 'One frame, multiple possibilities. Discover eyewear designed to adapt to your needs.',
    target: 'home',
  },
  {
    title: 'Explore different lenses',
    description: 'Choose Clear Vision, Sun Mode, Screen Mode, or Photochromic to preview the available lens concepts.',
    target: 'lenses',
  },
  {
    title: 'Personalize your frame',
    description: 'Try Midnight Black, Titanium Silver, and Ocean Cyan frame finishes.',
    target: 'frames',
  },
  {
    title: 'Discover the mechanism',
    description: 'Click PRESS to explore the proposed release button and locking latch concept.',
    target: 'technology',
  },
  {
    title: 'Change lenses step by step',
    description: 'Explore all six steps in the lens replacement guide.',
    target: 'replacement',
  },
]

const replacementSteps = [
  {
    title: 'Press the release button',
    description: 'Press the mechanism button to release the lens lock.',
    symbol: '↓',
  },
  {
    title: 'Unlock the latch',
    description: 'Move the latch to disengage the lens-retaining mechanism.',
    symbol: '↔',
  },
  {
    title: 'Slide the lens out',
    description: 'Carefully guide the existing lens along the frame rail.',
    symbol: '←',
  },
  {
    title: 'Choose a new lens',
    description: 'Select the lens option that suits your needs.',
    symbol: '◉',
  },
  {
    title: 'Slide the new lens in',
    description: 'Align the replacement lens with the guide rail.',
    symbol: '→',
  },
  {
    title: 'Lock and check',
    description: 'Secure the latch and check that the lens is seated correctly.',
    symbol: '✓',
  },
]

function App() {
  const [selectedLens, setSelectedLens] = useState('clear')
  const [selectedFrame, setSelectedFrame] = useState('silver')
  const [releaseActive, setReleaseActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [demoMode, setDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(0)

  useEffect(() => {
    if (!demoMode) return

    const section = demoSections[demoStep]

    document.getElementById(section.target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [demoMode, demoStep])

  const activeLens = lensOptions.find(
    (lens) => lens.id === selectedLens
  )

  const activeFrame = frameOptions.find(
    (frame) => frame.id === selectedFrame
  )

  const startDemonstration = () => {
    setReleaseActive((active) => !active)
  }

  const nextStep = () => {
    setCurrentStep((step) => (step + 1) % replacementSteps.length)
  }

  const previousStep = () => {
    setCurrentStep((step) =>
      (step - 1 + replacementSteps.length) % replacementSteps.length
    )
  }

  return (
    <main className="relens">
      <nav className="navbar">
        <a className="brand" href="#home">
          ReLens<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#technology">Technology</a>
          <a href="#lenses">Lens Studio</a>
          <a href="#frames">Frame Studio</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          type="button"
          className="nav-button start-demo-button"
          onClick={() => {
            setDemoStep(0)
            setDemoMode(true)
          }}
        >
          ▶ Start Demo
        </button>
      </nav>

      <section className="hero-section" id="home">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="eyebrow">EYEWEAR, REIMAGINED</p>

          <h1>
            One frame.
            <br />
            <span>Infinite ways</span>
            <br />
            to see.
          </h1>

          <p className="hero-description">
            Meet the eyewear that adapts to your life.
            Switch lenses, personalize your style, and
            experience comfort in a whole new way.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#lenses">
              Explore ReLens ↗
            </a>
            <a className="secondary-button" href="#technology">
              Discover how it works
            </a>
          </div>

          <div className="hero-note">
            <span className="status-dot" />
            ONE FRAME. MULTIPLE POSSIBILITIES.
          </div>
        </motion.div>

        <div className="glasses-stage">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="glasses-glow" />

          <motion.div
            className="glasses-3d-container"
            animate={{
              y: [0, -12, 0],
              rotateZ: [0, 1.5, 0, -1.5, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotateZ: {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <Glasses3D
              lensColor={activeLens.color}
              frameColor={activeFrame.color}
            />
          </motion.div>

          <div className="floating-label label-top">
            01 / MODULAR DESIGN
          </div>

          <div className="floating-label label-bottom">
            <span className="status-dot" />
            FRAME: {activeFrame.name.toUpperCase()}
            <span className="preview-divider">/</span>
            LENS: {activeLens.name.toUpperCase()}
          </div>
        </div>
      </section>

      <section className="feature-strip" id="features">
        <div>
          <span>01</span>
          <h3>One frame, many lenses</h3>
          <p>Switch for different needs.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Comfort-first fit</h3>
          <p>Soft, reusable nose pads.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Light on your face</h3>
          <p>Designed for everyday wear.</p>
        </div>
        <div>
          <span>04</span>
          <h3>Your style, your way</h3>
          <p>Explore frame finishes.</p>
        </div>
      </section>

      <section className="lens-section" id="lenses">
        <p className="eyebrow">YOUR VISION, YOUR CHOICE</p>
        <h2>
          One frame. <span>Different worlds.</span>
        </h2>
        <p>Choose a lens concept to explore.</p>

        <div className="lens-grid">
          {lensOptions.map((lens) => (
            <button
              type="button"
              key={lens.id}
              className={`lens-card ${selectedLens === lens.id ? 'selected' : ''}`}
              onClick={() => setSelectedLens(lens.id)}
              aria-pressed={selectedLens === lens.id}
            >
              <div className={`lens-swatch ${lens.swatch}`} />
              <h3>{lens.name}</h3>
              <p>{lens.description}</p>
              <span className="lens-select-label">
                {selectedLens === lens.id ? '✓ Selected' : 'Select lens ↗'}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="frame-section" id="frames">
        <p className="eyebrow">MAKE IT YOURS</p>
        <h2>
          Choose your <span>frame finish.</span>
        </h2>
        <p>Personalize your frame colour.</p>

        <div className="frame-options">
          {frameOptions.map((frame) => (
            <button
              key={frame.id}
              type="button"
              className={`frame-option ${selectedFrame === frame.id ? 'selected' : ''}`}
              onClick={() => setSelectedFrame(frame.id)}
              aria-pressed={selectedFrame === frame.id}
            >
              <span
                className="frame-swatch"
                style={{ backgroundColor: frame.color }}
              />
              <span>{frame.name}</span>
              {selectedFrame === frame.id && <span>✓</span>}
            </button>
          ))}
        </div>
      </section>

      <section className="mechanism-section" id="technology">
        <div>
          <p className="eyebrow">ENGINEERED TO SWITCH</p>

          <h2>
            Click. Slide.
            <br />
            <span>See differently.</span>
          </h2>

          <p>
            Explore the proposed push-button release, guided lens rail,
            and locking latch. Try the interactive demonstration to
            see how the lens-release concept could work.
          </p>
        </div>

        <div className={`lock-demo ${releaseActive ? 'release-active' : ''}`}>
          <div className="lock-line" />

          <motion.button
            type="button"
            className="lock-button"
            onClick={startDemonstration}
            whileTap={{ scale: 0.92 }}
            aria-pressed={releaseActive}
          >
            {releaseActive ? 'UNLOCKED' : 'PRESS'}
          </motion.button>

          <motion.div
            className="lock-latch"
            animate={{
              x: releaseActive ? 14 : 0,
              rotate: releaseActive ? 10 : 0,
            }}
            transition={{ duration: 0.35 }}
          >
            ↔
          </motion.div>

          <p>
            <span className="status-dot" />
            {releaseActive ? 'RELEASE CONCEPT ACTIVE' : 'SECURE LOCK CONCEPT'}
          </p>
        </div>
      </section>

      <section className="replacement-section" id="replacement">
        <p className="eyebrow">SIX SIMPLE STEPS</p>

        <h2>
          How to change
          <br />
          <span>your lenses.</span>
        </h2>

        <p className="replacement-intro">
          Explore the proposed lens replacement sequence.
        </p>

        <div className="step-progress">
          {replacementSteps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={`step-dot ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'visited' : ''}`}
              onClick={() => setCurrentStep(index)}
              aria-label={`View step ${index + 1}: ${step.title}`}
              aria-pressed={currentStep === index}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            className="replacement-card"
            key={currentStep}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="replacement-symbol">
              {replacementSteps[currentStep].symbol}
            </div>

            <p className="step-number">
              STEP {String(currentStep + 1).padStart(2, '0')} / 06
            </p>

            <h3>{replacementSteps[currentStep].title}</h3>

            <p>{replacementSteps[currentStep].description}</p>
          </motion.article>
        </AnimatePresence>

        <div className="step-controls">
          <button
            type="button"
            className="secondary-button"
            onClick={previousStep}
          >
            ← Previous
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={nextStep}
          >
            {currentStep === 5 ? 'Start again ↻' : 'Next step →'}
          </button>
        </div>

        <p className="prototype-note">
          Concept demonstration only. The physical mechanism requires
          prototype testing before real-world use.
        </p>
      </section>

      <section className="comfort-section">
        <div className="comfort-copy">
          <p className="eyebrow">COMFORT THAT MOVES WITH YOU</p>
          <h2>
            Made for your
            <br />
            <span>everyday.</span>
          </h2>
          <p>
            Lightweight frame concepts, soft reusable nose pads,
            and flexible temples designed with everyday comfort in mind.
          </p>
        </div>

        <div className="comfort-cards">
          <article>
            <span className="comfort-icon">◉</span>
            <h3>Soft nose pads</h3>
            <p>Reusable, washable and designed for a secure fit.</p>
          </article>
          <article>
            <span className="comfort-icon">⌁</span>
            <h3>Relax Mode</h3>
            <p>A low-profile temple concept for relaxed viewing.</p>
          </article>
          <article>
            <span className="comfort-icon">↗</span>
            <h3>Lightweight build</h3>
            <p>Designed to keep everyday eyewear feeling light.</p>
          </article>
        </div>
      </section>

      <section className="case-section">
        <div className="case-visual">
          <div className="case-shape">
            <div className="case-inner">
              <div className="case-lens" />
              <div className="case-lens" />
              <div className="case-cloth" />
            </div>
          </div>
        </div>

        <div className="case-copy">
          <p className="eyebrow">EVERYTHING IN ONE PLACE</p>
          <h2>
            Meet the
            <br />
            <span>ReLens case.</span>
          </h2>
          <p>
            Keep your frame, spare lenses, reusable nose pads,
            and cleaning cloth organized in one compact case.
          </p>
          <a className="primary-button" href="#home">
            Discover ReLens ↗
          </a>
        </div>
      </section>

      {/* NEW CONTACT SECTION */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <p className="eyebrow">LET'S CONNECT</p>

          <h2>
            Get in <span>Touch.</span>
          </h2>

          <p className="contact-description">
            Have a question about ReLens? We'd love to hear from you.
            Reach out and let's explore a new way to see the world.
          </p>

          <div className="contact-grid">
            <a
              className="contact-card"
              href="mailto:YOUR_EMAIL@example.com"
            >
              <span className="contact-icon">✉</span>
              <h3>Email Us</h3>
              <p>YOUR_EMAIL@example.com</p>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              className="contact-card"
              href="tel:+91XXXXXXXXXX"
            >
              <span className="contact-icon">☎</span>
              <h3>Call Us</h3>
              <p>+91 XXXXX XXXXX</p>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              className="contact-card"
              href="https://www.linkedin.com/in/YOUR-USERNAME"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">in</span>
              <h3>LinkedIn</h3>
              <p>Connect professionally</p>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              className="contact-card"
              href="https://www.instagram.com/YOUR-USERNAME/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">◎</span>
              <h3>Instagram</h3>
              <p>@YOUR-USERNAME</p>
              <span className="contact-arrow">↗</span>
            </a>
          </div>

          <p className="contact-footer">
            ReLens — One Frame. Endless Possibilities.
          </p>
        </div>
      </section>

      <footer>
        <a className="brand" href="#home">
          ReLens<span>.</span>
        </a>
        <p>Same frame. Different needs. One solution.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      {demoMode && (
        <div className="demo-overlay">
          <div
            className="demo-card"
            role="dialog"
            aria-modal="false"
            aria-labelledby="demo-title"
          >
            <div className="demo-card-top">
              <span>RELENS GUIDED TOUR</span>
              <button
                type="button"
                className="demo-exit"
                onClick={() => setDemoMode(false)}
                aria-label="Exit demo"
              >
                ✕
              </button>
            </div>

            <p className="demo-progress">
              STEP {demoStep + 1} OF {demoSections.length}
            </p>
            <h3 id="demo-title">{demoSections[demoStep].title}</h3>
            <p className="demo-description">
              {demoSections[demoStep].description}
            </p>

            <div className="demo-progress-track" aria-hidden="true">
              <div
                className="demo-progress-fill"
                style={{
                  width: `${((demoStep + 1) / demoSections.length) * 100}%`,
                }}
              />
            </div>

            <div className="demo-actions">
              <button
                type="button"
                className="demo-previous"
                disabled={demoStep === 0}
                onClick={() => setDemoStep((step) => step - 1)}
              >
                ← Previous
              </button>

              <button
                type="button"
                className="demo-next"
                onClick={() => {
                  if (demoStep === demoSections.length - 1) {
                    setDemoMode(false)
                    document.getElementById('home')?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  } else {
                    setDemoStep((step) => step + 1)
                  }
                }}
              >
                {demoStep === demoSections.length - 1
                  ? 'Finish Demo ✓'
                  : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
