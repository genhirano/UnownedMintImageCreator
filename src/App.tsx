import { useState } from 'react'
import './App.css'

interface ImageParameters {
  text: string
  font: string
  fontSize?: number
  fontColor?: string
  outlineColor?: string
  outlineWidth?: number
  cornerRadius?: number
  borderColor?: string
  borderWidth?: number
}

function App() {
  const [params, setParams] = useState<ImageParameters>({
    text: '愛',
    font: 'Noto Sans JP',
    fontSize: undefined,
    fontColor: '#333333',
    outlineColor: '#000000',
    outlineWidth: 5,
    cornerRadius: 30,
    borderColor: '#000000',
    borderWidth: 8
  })

  // Calculate font size automatically if not specified
  const calculateFontSize = (text: string, fontSize: number | undefined): number => {
    if (fontSize) return fontSize
    
    // Auto-adjust based on text length
    const baseSize = 400
    if (text.length === 1) return baseSize
    if (text.length <= 3) return baseSize * 0.8
    if (text.length <= 5) return baseSize * 0.6
    return baseSize * 0.4
  }

  const actualFontSize = calculateFontSize(params.text, params.fontSize)

  // Generate SVG content
  const generateSVG = (): string => {
    const { text, font, fontColor, outlineColor, outlineWidth, cornerRadius, borderColor, borderWidth } = params
    
    // Calculate rectangle dimensions accounting for stroke width
    const strokeWidth = borderWidth || 8
    const rectSize = 1024 - strokeWidth
    const rectOffset = strokeWidth / 2
    
    return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&amp;display=swap');
      .text-element {
        font-family: '${font}', sans-serif;
        font-size: ${actualFontSize}px;
        font-weight: 700;
        text-anchor: middle;
        alignment-baseline: middle;
        fill: ${fontColor || '#333333'};
        stroke: ${outlineColor || '#000000'};
        stroke-width: ${outlineWidth || 5};
        paint-order: stroke fill;
      }
    </style>
  </defs>
  <rect x="${rectOffset}" y="${rectOffset}" width="${rectSize}" height="${rectSize}" fill="#FFFFFF" rx="${cornerRadius || 30}" ry="${cornerRadius || 30}" stroke="${borderColor || '#000000'}" stroke-width="${strokeWidth}" />
  <text x="512" y="525" class="text-element">${text}</text>
</svg>`
  }

  // Download SVG file
  const downloadSVG = () => {
    const svgContent = generateSVG()
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${params.text}_mint_image.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const updateParam = <K extends keyof ImageParameters>(key: K, value: ImageParameters[K]) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="app">
      <h1>OpenSea ミント画像生成ツール</h1>
      
      <div className="container">
        <div className="controls">
          <h2>パラメータ設定</h2>
          
          <div className="control-group">
            <label htmlFor="text">表示テキスト:</label>
            <input
              id="text"
              type="text"
              value={params.text}
              onChange={(e) => updateParam('text', e.target.value)}
              placeholder="例: 愛 または A"
            />
          </div>

          <div className="control-group">
            <label htmlFor="font">フォント:</label>
            <select
              id="font"
              value={params.font}
              onChange={(e) => updateParam('font', e.target.value)}
            >
              <option value="Noto Sans JP">Noto Sans JP</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="fontSize">文字サイズ (px):</label>
            <input
              id="fontSize"
              type="number"
              value={params.fontSize || ''}
              onChange={(e) => updateParam('fontSize', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="自動調整"
              min="10"
              max="800"
            />
            <small>空欄の場合は自動調整されます</small>
          </div>

          <div className="control-group">
            <label htmlFor="fontColor">文字色:</label>
            <input
              id="fontColor"
              type="color"
              value={params.fontColor || '#333333'}
              onChange={(e) => updateParam('fontColor', e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="outlineColor">ふち色:</label>
            <input
              id="outlineColor"
              type="color"
              value={params.outlineColor || '#000000'}
              onChange={(e) => updateParam('outlineColor', e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="outlineWidth">ふち太さ (px):</label>
            <input
              id="outlineWidth"
              type="number"
              value={params.outlineWidth || 5}
              onChange={(e) => updateParam('outlineWidth', parseInt(e.target.value) || 0)}
              min="0"
              max="50"
            />
          </div>

          <div className="control-group">
            <label htmlFor="cornerRadius">角丸半径 (px):</label>
            <input
              id="cornerRadius"
              type="number"
              value={params.cornerRadius || 30}
              onChange={(e) => updateParam('cornerRadius', parseInt(e.target.value) || 0)}
              min="0"
              max="100"
            />
          </div>

          <div className="control-group">
            <label htmlFor="borderColor">外周線色:</label>
            <input
              id="borderColor"
              type="color"
              value={params.borderColor || '#000000'}
              onChange={(e) => updateParam('borderColor', e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="borderWidth">外周線太さ (px):</label>
            <input
              id="borderWidth"
              type="number"
              value={params.borderWidth || 8}
              onChange={(e) => updateParam('borderWidth', parseInt(e.target.value) || 0)}
              min="0"
              max="50"
            />
          </div>

          <button onClick={downloadSVG} className="download-btn">
            画像をダウンロード
          </button>
        </div>

        <div className="preview">
          <h2>プレビュー</h2>
          <div className="preview-container">
            <div 
              className="svg-preview"
              dangerouslySetInnerHTML={{ __html: generateSVG() }}
            />
          </div>
          <p className="preview-info">
            サイズ: 1024 × 1024 px<br/>
            実際の文字サイズ: {actualFontSize} px
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
