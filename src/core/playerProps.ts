import type { Property } from 'csstype'

type playsWhen = 'abort' | 'canplay' | 'canplaythrough' | 'durationchange' | 'emptied' | 'ended' | 'error' |
  'loadeddata' | 'loadedmetadata' | 'loadstart' | 'pause' | 'play' | 'playing' | 'progress' | 'ratechange' | 'seeked' |
  'seeking' | 'stalled' | 'suspend' | 'timeupdate' | 'volumechange' | 'waiting'

export interface PlayerProps {
  src: string
  mime?: string
  muted?: boolean
  loop?: boolean
  preload?: string
  objectFit?: Property.ObjectFit
  playsWhen?: playsWhen
  playbackRate?: number
  transition?: string
}

export const PlayerDefaultProps = {
  muted: true,
  loop: true,
  preload: 'auto',
  objectFit: 'cover' as Property.ObjectFit,
  playsWhen: 'canplay' as playsWhen, // Google HTML Video Events
  playbackRate: 1.0,
  transition: 'fade',
}
