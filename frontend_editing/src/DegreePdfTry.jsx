import { useEffect, useRef, useState } from "react"
import * as pdfjsLib from "pdfjs-dist"
import "pdfjs-dist/build/pdf.worker.entry"
import { createWorker } from "tesseract.js"
import "./styles.css"

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`

export default function UploadPDFAndOCR() {
  const [pdf, setPdf] = useState(null)
  const [images, setImages] = useState([])
  const imgEl = useRef()
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pdfRendering, setPdfRendering] = useState(false)
  const [pageRendering, setPageRendering] = useState(false)
  const [responses, setResponses] = useState([])

  const worker = createWorker()

  const showPdf = async (event) => {
    try {
      setPdfRendering(true)
      const file = event.target.files[0]
      const uri = URL.createObjectURL(file)
      const _PDF_DOC = await pdfjsLib.getDocument({ url: uri }).promise
      setPdf(_PDF_DOC)
      setTotalPages(_PDF_DOC.numPages)
      setPdfRendering(false)
      document.getElementById("file-to-upload").value = ""
    } catch (error) {
      alert(error.message)
    }
  }

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const renderPage = async () => {
    setPageRendering(true)
    const imagesList = []
    const canvas = document.createElement("canvas")

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const viewport = page.getViewport({ scale: 3 }) // Increase the scale for higher resolution
      canvas.height = viewport.height
      canvas.width = viewport.width
      const render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      }
      await page.render(render_context).promise
      const img = canvas.toDataURL("image/png")
      imagesList.push(img)
    }
    setImages(imagesList)
    setPageRendering(false)
  }

  useEffect(() => {
    if (pdf) {
      renderPage()
    }
    // eslint-disable-next-line
  }, [pdf, currentPage])

  const doOCR = async (image, rectangle) => {
    try {
      await worker.load()
      await worker.loadLanguage("eng")
      await worker.initialize("eng")

      const { data } = await worker.recognize(image, {
        rectangles: [rectangle],
      })

      setResponses((prevResponses) => [...prevResponses, data.text])
      return data
    } catch (error) {
      console.error("Error performing OCR:", error)
    }
  }

  const dataFetch = async (imgElement) => {
    const imgWidth = imgElement.naturalWidth
    const imgHeight = imgElement.naturalHeight

    const rectangleR = {
      height: (19 / 841.89) * imgHeight, // height relative to original PDF height
      left: (93 / 595.28) * imgWidth, // left relative to original PDF width
      top: (172 / 841.89) * imgHeight, // top relative to original PDF height
      width: (44 / 595.28) * imgWidth, // width relative to original PDF width
    }
    const rectangleT = {
      height: (17 / 841.89) * imgHeight,
      left: (276.087 / 595.28) * imgWidth,
      top: (457.3 / 841.89) * imgHeight,
      width: (60 / 595.28) * imgWidth,
    }
    const rectangleO = {
      height: (19 / 841.89) * imgHeight,
      left: (341.087 / 595.28) * imgWidth,
      top: (457.3 / 841.89) * imgHeight,
      width: (55 / 595.28) * imgWidth,
    }

    await doOCR(imgElement.src, rectangleR)
    await doOCR(imgElement.src, rectangleT)
    await doOCR(imgElement.src, rectangleO)
    console.log(rectangleR)
    console.log(rectangleT)
    console.log(rectangleO)
  }

  useEffect(() => {
    if (images.length > 0) {
      dataFetch(imgEl.current)
    }
    // eslint-disable-next-line
  }, [images])

  const styles = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
    },
    imageWrapper: {
      border: "1px solid rgba(0,0,0,0.15)",
      borderRadius: "3px",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.25)",
      padding: "0",
      position: "relative",
    },
  }

  return (
    <div className="App">
      <button
        id="upload-button"
        onClick={() => document.getElementById("file-to-upload").click()}
      >
        Select PDF
      </button>
      <input
        type="file"
        id="file-to-upload"
        accept="application/pdf"
        hidden
        onChange={showPdf}
      />
      <div id="pdf-main-container">
        <div id="pdf-loader" hidden={!pdfRendering}>
          Loading document ...
        </div>
        <div id="page-count-container">
          Page {currentPage} of {totalPages}
        </div>
        <div id="pdf-contents">
          <div id="pdf-meta">
            <div id="pdf-buttons">
              <button id="pdf-prev" onClick={() => changePage(currentPage - 1)}>
                Previous
              </button>
              <button id="pdf-next" onClick={() => changePage(currentPage + 1)}>
                Next
              </button>
            </div>
          </div>
          <div id="image-canvas-row">
            <div style={styles.wrapper}>
              {images.map((image, idx) => (
                <div key={idx} style={styles.imageWrapper}>
                  <img
                    ref={imgEl}
                    id="image-generated"
                    src={image}
                    alt="pdfImage"
                    style={{
                      width: "100%",
                      height: "100%",
                      margin: "0",
                      border: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div id="page-loader" hidden={!pageRendering}>
            Loading page ...
          </div>
          <div>
            <ul>
              {responses.map((response, index) => (
                <li
                  key={index}
                  className="bg-slate-100 border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center mb-2"
                >
                  {response}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
