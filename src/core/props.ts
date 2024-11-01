import { PlayerDefaultProps, type PlayerProps } from './playerProps.ts'

export interface Sources {
  src: string
  res: number
  autoplay: boolean
  poster: string
}

export interface Props extends PlayerProps {
  sources?: Sources[]
  autoplay?: boolean
  poster?: string
  overlay?: string
}

export const DefaultProps = {
  sources: () => [],
  autoplay: true,
  poster: '',
  overlay: '',
  ...PlayerDefaultProps,
}
