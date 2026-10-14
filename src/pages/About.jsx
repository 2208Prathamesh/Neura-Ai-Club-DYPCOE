import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import domains from '../data/domains.json'
import about from '../data/about.json'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const { pillars, vision, lead } = about

export default function About() {
  return (
    <>
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <Logo size={110} />
          <p className="eyebrow">About us</p>
          <h1>Neura AI Club</h1>
          <p className="lead">{lead}</p>
        </motion.div>
      </section>

      <section className="section container" id="vision">
        <motion.div {...rise()} className="vision">
          <div className="vision__label">
            <p className="eyebrow">{vision.eyebrow}</p>
            <h2>{vision.title}</h2>
          </div>
          <div className="vision__body">
            <p className="vision__quote">{vision.quote}</p>
            <div className="grid grid--3">
              {pillars.map((p, i) => (
                <motion.div key={p.title} className="card" {...rise(i * 0.1)}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section container">
        <motion.div {...rise()} className="section__head">
          <p className="eyebrow">Focus areas</p>
          <h2>What the club works on</h2>
        </motion.div>
        <div className="grid grid--4">
          {domains.map((d, i) => (
            <motion.article key={d.title} className="card card--tilt" {...rise(i * 0.08)}>
              <span className="card__icon">{d.icon}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
