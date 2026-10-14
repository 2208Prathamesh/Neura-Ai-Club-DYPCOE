import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import { domains } from '../data/club.js'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const pillars = [
  { title: 'Learn', text: 'Hands-on sessions that turn AI concepts into working understanding.' },
  { title: 'Build', text: 'Student-led projects that apply machine learning and generative AI to real problems.' },
  { title: 'Lead', text: 'A community where members grow into confident, responsible technologists.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <Logo size={110} />
          <p className="eyebrow">About us</p>
          <h1>Neura AI Club</h1>
          <p className="lead">
            Neura is the AI club of the Department of Information Technology at D. Y. Patil College of
            Engineering, Akurdi, Pune. We bring students together to explore artificial intelligence,
            build things and learn from one another.
          </p>
        </motion.div>
      </section>

      <section className="section container" id="vision">
        <motion.div {...rise()} className="vision">
          <div className="vision__label">
            <p className="eyebrow">Our Vision</p>
            <h2>Intelligence, built together</h2>
          </div>
          <div className="vision__body">
            <p className="vision__quote">
              To nurture a community of student innovators at DYPCOE who understand, build and apply
              artificial intelligence responsibly, turning curiosity into skill and skill into
              solutions that matter.
            </p>
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
