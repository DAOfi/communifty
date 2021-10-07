export interface ViewObject {
  data: {
    repeat: number
    quality: number
    duration: number
    frameRate: number
    test: boolean
    isPng: boolean
    appendGif: boolean
    canvas: any
    meta: any
  }
  sketch: (p: any) => void
}

export type ViewFunc = (
  projectId: number,
  tokenId: number,
  projectTokenId: number
) => ViewObject

export { testView } from './test'
