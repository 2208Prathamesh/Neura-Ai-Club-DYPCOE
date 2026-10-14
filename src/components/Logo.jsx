import { asset } from '../utils.js'

// The exact "Ai" mark from the official Neura logo (transparent PNG).
// `size` is the rendered width in px.
export default function Logo({ size = 40, className = '' }) {
  return (
    <img
      className={`logo-img ${className}`}
      src={asset('logo-mark.png')}
      width={size}
      alt="Neura AI Club logo"
      draggable={false}
    />
  )
}
