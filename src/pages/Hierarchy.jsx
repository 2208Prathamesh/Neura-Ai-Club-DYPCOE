import { motion } from 'framer-motion'
import PersonCard from '../components/PersonCard.jsx'
import { faculty, president, vicePresident, leads, coordinators } from '../data/club.js'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

function Tier({ index, label, title, children }) {
  return (
    <section className="tier">
      <div className="tier__rail">
        <span className="tier__node">{index}</span>
      </div>
      <div className="tier__body">
        <motion.div {...rise()}>
          <p className="eyebrow">{label}</p>
          <h2>{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}

const leadsByDomain = new Map(leads.map((lead) => [lead.domain, lead]))

export default function Hierarchy() {
  return (
    <>
      <section className="page-hero">
        <motion.div {...rise()} className="container page-hero__inner">
          <p className="eyebrow">Club hierarchy</p>
          <h1>The people of Neura</h1>
          <p className="lead">
            From faculty guidance to student leadership and domain coordinators, here is how the club
            is organised.
          </p>
        </motion.div>
      </section>

      <div className="container tiers">
        <Tier index="1" label="Guidance" title="Faculty Coordinators">
          <div className="grid grid--people">
            {faculty.map((f, i) => (
              <PersonCard key={f.name} name={f.name} role={f.role} delay={i * 0.06} />
            ))}
          </div>
        </Tier>

        <Tier index="2" label="Student leadership" title="President & Vice President">
          <div className="grid grid--pair">
            <PersonCard name={president.members[0]} role={president.role} size="lg" accent />
            <PersonCard name={vicePresident.members[0]} role={vicePresident.role} size="lg" accent delay={0.08} />
          </div>
        </Tier>

        <Tier index="3" label="Domain teams" title="Leads & Coordinators">
          <div className="domains">
            {coordinators.map((c) => (
              <div key={c.domain} className="domain">
                <motion.h3 className="domain__title" {...rise()}>
                  {c.domain}
                  <span>{c.members.length + (leadsByDomain.get(c.domain)?.members.length ?? 0)}</span>
                </motion.h3>
                {leadsByDomain.has(c.domain) && (
                  <div className="domain__group">
                    <h4 className="domain__label">Leads</h4>
                    <div className="grid grid--people-sm">
                      {leadsByDomain.get(c.domain).members.map((m, i) => (
                        <PersonCard
                          key={m}
                          name={m}
                          role={leadsByDomain.get(c.domain).role}
                          size="sm"
                          accent
                          delay={(i % 5) * 0.05}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="domain__group">
                  <h4 className="domain__label">Coordinators</h4>
                  <div className="grid grid--people-sm">
                    {c.members.map((m, i) => (
                      <PersonCard key={m} name={m} role="Coordinator" size="sm" delay={(i % 5) * 0.05} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tier>
      </div>
    </>
  )
}
