import { ViewFunc } from '.'

export const testView: ViewFunc = (
  projectId: number,
  tokenId: number,
  projectTokenId: number
) => {
  const data: any = {
    repeat: 0,
    quality: 10,
    duration: 1,
    frameRate: 1,
    isPng: true,
    appendGif: true,
    test: false,
  }
  const sketch = (p: any) => {
    data.meta = {}
    data.meta.name = `Generative Test ${projectTokenId}`
    data.meta.description = 'Super Awesome '
    data.meta.attributes = []
    data.meta.attributes.push({
      trait_type: 'Test Generative',
      value: 'All Test',
    })

    p.setup = () => {
      data.canvas = p.createCanvas(200, 200)
    }
    p.draw = () => {
      p.background(50)
      p.text('hello world!', 50, 100)
    }
  }

  return {
    data,
    sketch,
  }
}