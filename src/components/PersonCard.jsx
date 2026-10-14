import { motion } from 'framer-motion'
import { slugify } from '../utils.js'

// Drop photos into src/assets/team/ named after the person, e.g. harshal.jpg,
// vedika-chaudhari.png. Any of jpg / jpeg / png / webp works. Photos are matched
// by the slug of the name in src/data/club.js; no code change needed.
const files = import.meta.glob('../assets/team/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const photos = {}
for (const [path, url] of Object.entries(files)) {
  const base = path.split('/').pop().replace(/\.[^.]+$/, '')
  photos[slugify(base)] = url
}

const initials = (name) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

export default function PersonCard({ name, role, size = 'md', accent = false, delay = 0 }) {
  const src = photos[slugify(name)]
  return (
    <motion.article
      className={`person person--${size} ${accent ? 'person--accent' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="person__photo">
        {src ? (
          <img src={src} alt={name} loading="lazy" />
        ) : (
          <span className="person__initials" aria-hidden>
            {initials(name)}
          </span>
        )}
        <span className="person__shade" aria-hidden />
      </div>
      <div className="person__info">
        <h3>{name}</h3>
        {role && <p className="role">{role}</p>}
      </div>
    </motion.article>
  )
}
