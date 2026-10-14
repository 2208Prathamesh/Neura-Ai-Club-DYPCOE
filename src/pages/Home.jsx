import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero3D from '../components/Hero3D.jsx'
import domains from '../data/domains.json'
import site from '../data/site.json'
import { asset } from '../utils.js'

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const BASE = reduced ? 0 : 3.2

const rise = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function Home() {
  const [run, setRun] = useState(0)

  return (
    <>
      <section className="hero">
        <div className="hero__canvas" key={`c${run}`}>
          <Hero3D reduced={reduced} />
        </div>
        <div className="hero__glow" aria-hidden />

        <div className="hero__overlay" key={`o${run}`}>
          <h1 className="hero__name">
            <motion.img
              className="hero__wordmark"
              src={asset('logo-text.png')}
              alt="Neura AI Club, DYPCOE"
              draggable={false}
              style={{ transformPerspective: 900 }}
              initial={{ opacity: 0, rotateX: -75, y: 50, scale: 0.92, filter: 'blur(14px)' }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: BASE, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </h1>
          <motion.p
            className="hero__tag"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 1, duration: 0.8 }}
          >
            {site.tagline}
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: BASE + 1.3, duration: 0.8 }}
          >
            <Link to="/about" className="btn btn--primary">
              Discover Neura
            </Link>
            <Link to="/events" className="btn btn--ghost">
              View Events
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section container">
        <motion.div {...rise} className="section__head">
          <p className="eyebrow">What we explore</p>
          <h2>Where curiosity meets intelligence</h2>
        </motion.div>
        <div className="grid grid--4">
          {domains.map((d, i) => (
            <motion.article
              key={d.title}
              className="card card--tilt"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="card__icon">{d.icon}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section container">
        <motion.div {...rise} className="cta-band">
          <h2>Meet the minds behind Neura</h2>
          <p>Faculty coordinators, leads and coordinators who run the club.</p>
          <Link to="/hierarchy" className="btn btn--primary">
            See the hierarchy
          </Link>
        </motion.div>
      </section>
    </>
  )
}
