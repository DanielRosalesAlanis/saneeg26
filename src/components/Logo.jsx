import logo from '../assets/SANEEG-LOGO.png';

export function Logo({ height = 32, center = false, light = false }) {
  return (
    <img
      src={logo}
      alt="SanEEG"
      style={{
        height,
        width: 'auto',
        display: 'block',
        margin: center ? '0 auto' : undefined,
        filter: light ? 'brightness(0) invert(1)' : undefined,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}
