import React from 'react';

/**
 * SciFiIcons - 100% SVG-FREE SCIENTIFIC FUTURISTIC ICON LIBRARY
 * Designed exclusively with CSS geometry, HTML5 shapes, and precision Unicode glyphs.
 * ZERO <svg> elements are rendered anywhere in the DOM.
 */

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  verticalAlign: 'middle',
  lineHeight: 1,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  userSelect: 'none',
  flexShrink: 0
};

export function createIcon(renderGlyph, defaultLabel = 'icon') {
  return function IconComponent({
    size = 18,
    color = 'currentColor',
    className = '',
    style = {},
    ...props
  }) {
    const numSize = typeof size === 'number' ? size : parseInt(size, 10) || 18;
    return (
      <span
        className={`scifi-icon ${className}`}
        style={{
          ...baseStyle,
          width: `${numSize}px`,
          height: `${numSize}px`,
          fontSize: `${Math.round(numSize * 0.85)}px`,
          color,
          ...style
        }}
        role="img"
        aria-label={defaultLabel}
        {...props}
      >
        {renderGlyph(numSize, color)}
      </span>
    );
  };
}

// Navigation & Directional
export const ArrowRight = createIcon((s) => <span style={{ fontWeight: 800, transform: 'translateX(1px)' }}>→</span>, 'Arrow Right');
export const ArrowLeft = createIcon((s) => <span style={{ fontWeight: 800, transform: 'translateX(-1px)' }}>←</span>, 'Arrow Left');
export const ArrowUpRight = createIcon((s) => <span style={{ fontWeight: 800, transform: 'translate(1px, -1px)' }}>↗</span>, 'Arrow Up Right');
export const ChevronRight = createIcon((s) => <span style={{ fontWeight: 700, fontSize: `${s * 0.9}px` }}>›</span>, 'Chevron Right');
export const ChevronLeft = createIcon((s) => <span style={{ fontWeight: 700, fontSize: `${s * 0.9}px` }}>‹</span>, 'Chevron Left');

// Actions & Controls
export const Play = createIcon((s) => (
  <span style={{
    display: 'inline-block',
    width: 0,
    height: 0,
    borderTop: `${s * 0.35}px solid transparent`,
    borderBottom: `${s * 0.35}px solid transparent`,
    borderLeft: `${s * 0.6}px solid currentColor`,
    marginLeft: `${s * 0.1}px`
  }} />
), 'Play');

export const Pause = createIcon((s) => (
  <span style={{ display: 'inline-flex', gap: `${Math.max(2, s * 0.2)}px` }}>
    <span style={{ width: `${Math.max(2, s * 0.2)}px`, height: `${s * 0.65}px`, background: 'currentColor', borderRadius: '1px' }} />
    <span style={{ width: `${Math.max(2, s * 0.2)}px`, height: `${s * 0.65}px`, background: 'currentColor', borderRadius: '1px' }} />
  </span>
), 'Pause');

export const Check = createIcon((s) => <span style={{ fontWeight: 900, color: '#10B981' }}>✓</span>, 'Check');
export const CheckCircle2 = createIcon((s) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${s * 0.9}px`,
    height: `${s * 0.9}px`,
    borderRadius: '50%',
    border: `1.5px solid currentColor`,
    fontSize: `${s * 0.65}px`,
    fontWeight: 900
  }}>✓</span>
), 'Check Circle');

export const X = createIcon((s) => <span style={{ fontWeight: 700 }}>✕</span>, 'Close');
export const Menu = createIcon((s) => (
  <span style={{
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: `${s * 0.8}px`,
    height: `${s * 0.6}px`
  }}>
    <span style={{ height: '2px', background: 'currentColor', borderRadius: '2px', width: '100%' }} />
    <span style={{ height: '2px', background: 'currentColor', borderRadius: '2px', width: '100%' }} />
    <span style={{ height: '2px', background: 'currentColor', borderRadius: '2px', width: '100%' }} />
  </span>
), 'Menu');

// Telemetry & Scientific Indicators
export const Zap = createIcon((s) => <span style={{ color: '#19D5E8', fontWeight: 900 }}>⚡</span>, 'Energy');
export const Activity = createIcon((s) => <span style={{ fontWeight: 800, letterSpacing: '-1px' }}>∿</span>, 'Telemetry');
export const Flame = createIcon((s) => <span style={{ color: '#F59E0B' }}>🔥</span>, 'Boost');
export const Sparkles = createIcon((s) => <span style={{ color: '#19D5E8' }}>✧</span>, 'Quantum');
export const Star = createIcon((s) => <span style={{ color: '#E5C98D' }}>★</span>, 'Star');
export const Target = createIcon((s) => <span style={{ fontWeight: 900 }}>◎</span>, 'Target');
export const Magnet = createIcon((s) => <span style={{ fontWeight: 900 }}>🧲</span>, 'Attractor');

// Security & Shielding
export const Shield = createIcon((s) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${s * 0.85}px`,
    fontWeight: 900
  }}>⛨</span>
), 'Shield');

export const ShieldCheck = createIcon((s) => (
  <span style={{
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <span style={{ fontSize: `${s * 0.85}px` }}>🛡</span>
  </span>
), 'Shield Check');

export const Lock = createIcon((s) => (
  <span style={{ fontSize: `${s * 0.8}px` }}>🔒</span>
), 'Locked');

// Progression, Rewards & Assets
export const Trophy = createIcon((s) => <span style={{ color: '#E5C98D' }}>🏆</span>, 'Trophy');
export const Award = createIcon((s) => <span style={{ color: '#19D5E8' }}>🎖</span>, 'Achievement');
export const Crown = createIcon((s) => <span style={{ color: '#E5C98D' }}>👑</span>, 'Sovereign');
export const Gift = createIcon((s) => <span style={{ color: '#E5C98D' }}>🎁</span>, 'Reward');
export const Coins = createIcon((s) => <span style={{ color: '#E5C98D' }}>🪙</span>, 'Assets');
export const CircleDollarSign = createIcon((s) => <span style={{ color: '#10B981', fontWeight: 900 }}>$</span>, 'Currency');
export const Wallet = createIcon((s) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${s * 0.85}px`,
    height: `${s * 0.65}px`,
    border: '2px solid currentColor',
    borderRadius: '3px',
    position: 'relative'
  }}>
    <span style={{ position: 'absolute', right: '2px', width: '3px', height: '3px', borderRadius: '50%', background: 'currentColor' }} />
  </span>
), 'Wallet');

// Dashboard & UI
export const LayoutDashboard = createIcon((s) => (
  <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', width: `${s * 0.75}px`, height: `${s * 0.75}px` }}>
    <span style={{ background: 'currentColor', borderRadius: '1px' }} />
    <span style={{ background: 'currentColor', borderRadius: '1px' }} />
    <span style={{ background: 'currentColor', borderRadius: '1px' }} />
    <span style={{ background: 'currentColor', borderRadius: '1px' }} />
  </span>
), 'Dashboard');

export const Home = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>⌂</span>, 'Home');
export const Gamepad2 = createIcon((s) => <span style={{ fontSize: `${s * 0.9}px` }}>🎮</span>, 'Game Arcade');
export const BarChart2 = createIcon((s) => (
  <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: '2px', height: `${s * 0.7}px` }}>
    <span style={{ width: '3px', height: '40%', background: 'currentColor', borderRadius: '1px' }} />
    <span style={{ width: '3px', height: '70%', background: 'currentColor', borderRadius: '1px' }} />
    <span style={{ width: '3px', height: '100%', background: 'currentColor', borderRadius: '1px' }} />
  </span>
), 'Analytics');

export const TrendingUp = createIcon((s) => <span style={{ color: '#10B981', fontWeight: 900 }}>↗</span>, 'Trending Up');
export const Clock = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>⏱</span>, 'Clock');
export const Clock3 = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>🕒</span>, 'Time');
export const Bell = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>🔔</span>, 'Alerts');
export const Settings = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>⚙</span>, 'Settings');
export const RefreshCw = createIcon((s) => <span style={{ fontWeight: 800 }}>↻</span>, 'Refresh');
export const RotateCcw = createIcon((s) => <span style={{ fontWeight: 800 }}>↺</span>, 'Reset');
export const Filter = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>⑂</span>, 'Filter');
export const Globe = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>🌐</span>, 'Network');
export const ExternalLink = createIcon((s) => <span style={{ fontSize: `${s * 0.75}px` }}>↗</span>, 'External Link');
export const Copy = createIcon((s) => <span style={{ fontSize: `${s * 0.75}px` }}>❐</span>, 'Copy');
export const Share2 = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>⚲</span>, 'Share');
export const Info = createIcon((s) => <span style={{ fontWeight: 800 }}>ⓘ</span>, 'Information');

// Operative & Social
export const User = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>👤</span>, 'User');
export const UserRound = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>👤</span>, 'Operative');
export const Users = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>👥</span>, 'Operatives');
export const Mail = createIcon((s) => <span style={{ fontSize: `${s * 0.85}px` }}>✉</span>, 'Comms');
export const Camera = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>📷</span>, 'Optics');
export const Edit3 = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>✎</span>, 'Edit');
export const ClipboardCheck = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>☑</span>, 'Verified');
export const GitBranch = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>⑂</span>, 'Branch');
export const Volume2 = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>🔊</span>, 'Audio On');
export const VolumeX = createIcon((s) => <span style={{ fontSize: `${s * 0.8}px` }}>🔇</span>, 'Audio Muted');

// Default generic icon fallback
export default Zap;
