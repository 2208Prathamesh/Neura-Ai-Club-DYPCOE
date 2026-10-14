import { useState } from 'react'
import { motion } from 'framer-motion'
import site from '../data/site.json'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleCopyEmail = () => {
    if (site.contactEmail) {
      navigator.clipboard.writeText(site.contactEmail)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <p className="eyebrow">Get in touch</p>
          <h1>Contact Us</h1>
          <p className="lead">
            Have a question, collaboration idea, or want to connect with Neura AI Club? Drop us a message below or reach out directly.
          </p>
        </motion.div>
      </section>

      <section className="section container">
        {/* Quick Channels Grid */}
        <div className="contact-quick-grid">
          {/* WhatsApp Card */}
          {site.socials?.whatsapp && (
            <motion.div className="contact-quick-card contact-quick-card--highlight" {...rise(0.04)}>
              <div className="contact-quick-card__tag">COMMUNITY</div>
              <h3>WhatsApp Group</h3>
              <p>Join the official student group for announcements, discussions, and event updates.</p>
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary contact-quick-card__cta"
              >
                <span>Join Group</span>
                <span className="btn-arrow">↗</span>
              </a>
            </motion.div>
          )}

          {/* Email Card */}
          <motion.div className="contact-quick-card" {...rise(0.08)}>
            <div className="contact-quick-card__tag">DIRECT EMAIL</div>
            <h3>Email Us</h3>
            <p>For questions, proposals, or direct communication with the team.</p>
            <div className="contact-email-box">
              <a href={`mailto:${site.contactEmail}`} className="contact-email-link">
                {site.contactEmail || 'aiclub.dypcoe@gmail.com'}
              </a>
              <button
                type="button"
                className="contact-email-copy-btn"
                onClick={handleCopyEmail}
                aria-label="Copy email"
              >
                {copiedEmail ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </motion.div>

          {/* Social Channels */}
          <motion.div className="contact-quick-card" {...rise(0.12)}>
            <div className="contact-quick-card__tag">SOCIALS</div>
            <h3>Follow Neura</h3>
            <p>Check out our latest project demos, workshop recaps, and announcements.</p>
            <div className="contact-social-row">
              {site.socials?.instagram && (
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-chip"
                >
                  Instagram ↗
                </a>
              )}
              {site.socials?.linkedin && (
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-chip"
                >
                  LinkedIn ↗
                </a>
              )}
              {site.socials?.github && (
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-chip"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Simple, Unified Contact Form */}
        <motion.div className="contact-form-container" {...rise(0.16)}>
          <div className="contact-form-header">
            <h2>Send a Message</h2>
            <p className="muted">Fill out the form and our team will get back to you shortly.</p>
          </div>

          {submitted ? (
            <div className="contact-success-state">
              <div className="contact-success-badge">✓</div>
              <h3>Message Sent Successfully</h3>
              <p>
                Thank you, <strong>{form.name}</strong>. We have received your message and will respond to{' '}
                <strong>{form.email}</strong> as soon as possible.
              </p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', email: '', subject: '', message: '' })
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-simple-form" onSubmit={handleSubmit}>
              <div className="form-fields-grid">
                <div className="field-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn--primary btn--lg">
                  <span>Send Message</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  )
}
