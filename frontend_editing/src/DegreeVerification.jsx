import { useEffect, useRef, useState } from "react"
import { Annotorious } from "@recogito/annotorious"
import { createWorker } from "tesseract.js"
import { saveAs } from "file-saver"
import {
  Button,
  IconButton,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import QRCode from "qrcode"
import Draggable from "draggable"
import QrScanner from "qr-scanner"
import mergeImages from "merge-images"
import theme from "./utils/theme"
import "@recogito/annotorious/dist/annotorious.min.css"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import api from "./utils/api"
import toast from "react-hot-toast"
import "./App.css" // Import your CSS file

const Input = styled("input")({
  display: "none",
})

const DegreeVerification = () => {
  // Ref to the image DOM element
  const imgEl = useRef()

  // const [verification, setVerification] = useState(false)
  // const [unVerification, setUnVerification] = useState(false)
  // const [umair, setUmair] = useState()

  // For plus button
  const [plusForOpen, setPlusForOpen] = useState(false)

  // The current Annotorious instance
  const [anno, setAnno] = useState()

  // Current drawing tool name
  const [tool, setTool] = useState("rect")

  const [umair, setUmair] = useState(false)

  // Holds the Degree image base64
  const [degreeImage, setDegreeImage] = useState("")

  const [degreeImageBoundries, setDegreeImageBoundries] = useState({})

  const [regex, setRegex] = useState(``)

  // Holds the QRCode image base64
  const [QRCodeImg, setQRCodeImg] = useState("")

  const [QRCodeX, setQRCodeX] = useState(null)

  const [QRCodeY, setQRCodeY] = useState(null)

  const [currentBoundingBox, setCurrentBoundingBox] = useState({})

  const [isBoundingBoxStatic, setIsBoundingBoxStatic] = useState("static")

  const [openBoundingBoxModal, setOpenBoundingBoxModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const handleOpenBoundingBoxModal = () => setOpenBoundingBoxModal(true)
  const handleCloseBoundingBoxModal = () => setOpenBoundingBoxModal(false)

  const handleChangeRadioButton = (e) => setIsBoundingBoxStatic(e.target.value)

  // Holds BBoxes Values
  const [boundingBoxes, setBoundingBoxes] = useState([])
  const [boundingBoxesWithType, setBoundingBoxesWithType] = useState([])

  // Keep tracks of is user finished with bounding boxes
  const [isBBoxFinalized, setIsBBoxFinalized] = useState(false)

  const [responses, setResponses] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  // Navigation for changing pages
  // const navigate = useNavigate()

  // Holds the modal state
  // const [open, setOpen] = useState(false)

  // Hols the snackbar state
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: ``,
    backgroundColor: ``,
  })

  // Predefined tags list for degree BBoxes
  const predefinedDegreeTags = ["Roll No", "Obtain Number"]

  // Make worker for OCR
  // Print each step of the processing.
  /*
    Take base64 encoded image and rectangle coordinates of bounding box,
    then pass it to the OCR, OCR remove the extra pixels from the rectangle 
    and return the response.
    */
  const worker = createWorker()

  // const doOCR = async (image, rectangle) => {
  //   // Intializing the worker
  //   await worker.load()
  //   await worker.loadLanguage('eng')
  //   await worker.initialize('eng')

  //   const { data } = await worker.recognize(image, {
  //     rectangles: [rectangle],
  //   })

  //   console.log(data.text);
  //   setUmair(data.text)
  //   return data
  // }

  const doOCR = async (image, rectangle) => {
    try {
      // Assuming you have 'worker' and 'setUmair' from your original implementation
      await worker.load()
      await worker.loadLanguage("eng")
      await worker.initialize("eng")
      // setResponses(() => ['', 'data.text']);

      const { data } = await worker.recognize(image, {
        rectangles: [rectangle],
      })

      console.log(data.text)

      // Update the responses state with the new OCR result
      setResponses((prevResponses) => [...prevResponses, data.text])

      return data
    } catch (error) {
      console.error("Error performing OCR:", error)
      // Handle errors as needed
    }
  }
  // Set drawing tool to 'rect'
  const handleRectangleTool = () => {
    if (tool === "polygon") {
      setTool("rect")
      anno.setDrawingTool("rect")
    }
  }

  // Set drawing tool to 'polygon'
  const handlePolygonTool = () => {
    if (tool === "rect") {
      setTool("polygon")
      anno.setDrawingTool("polygon")
    }
  }

  // Degree image handler.
  // When image change then this function fires.
  // Convert the blob to base64.
  // Set the base64 in 'degreeImage' state variable.
  const onDegreeImageChange = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setDegreeImage(reader.result)
      }
    }

    const file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  // Initialize Annotorious when the component
  // mounts, and keep the current 'anno'
  // instance in the application state
  useEffect(() => {
    let annotorious = null

    if (imgEl.current) {
      // Initialize annotorious
      annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [
          {
            widget: "TAG",
            vocabulary: predefinedDegreeTags,
          },
        ],
      })

      // EVENT: Fires when the annotation is created
      annotorious.on("createAnnotation", async (annotation) => {
        // Check if the selected tag exists in the predefined
        // degree tags array
        const tagExists = annotation.body.find((tag) =>
          predefinedDegreeTags.includes(tag.value)
        )

        // Only one tag is allowed for one annotation.
        if (annotation.body.length > 1) {
          annotorious.removeAnnotation(annotation)
          setOpenSnackbar({
            open: true,
            message: "Only one tag is allowed for annotation!",
            backgroundColor: theme.palette.error.main,
          })
          return
        }

        // If tag not exist, then remove the annotation
        // and stop the further execution
        if (!tagExists) {
          annotorious.removeAnnotation(annotation)
          setOpenSnackbar({
            open: true,
            message: "Only predefined tags are allowed!",
            backgroundColor: theme.palette.error.main,
          })
          return
        }
        setSelectedTags((prevTags) => [...prevTags, tagExists.value])

        // Destructuring the bounding box coords
        const [left, top, width, height] = annotation.target.selector.value
          .split("xywh=pixel:")[1]
          .split(",")

        // Getting the image with bounding boxes
        const imageWithBBox = annotation.target.source

        // Preparing the rectangle
        const rectangle = { height, width, left, top }

        const data = await doOCR(imageWithBBox, rectangle)

        const boundingBox = {
          x: data.blocks[0].bbox.x0,
          y: data.blocks[0].bbox.y0,
          width: data.blocks[0].bbox.x1 - data.blocks[0].bbox.x0,
          height: data.blocks[0].bbox.y1 - data.blocks[0].bbox.y0,
          label: annotation.body[0].value,
        }

        setCurrentBoundingBox(boundingBox)

        setBoundingBoxes((prevBoundingBoxes) => [
          ...prevBoundingBoxes,
          boundingBox,
        ])

        // Shrink the bounding box
        annotorious.addAnnotation({
          ...annotation,
          target: {
            selector: {
              ...annotation.target.selector,
              value: `xywh=pixel:${data.blocks[0].bbox.x0},${
                data.blocks[0].bbox.y0
              },${data.blocks[0].bbox.x1 - data.blocks[0].bbox.x0},${
                data.blocks[0].bbox.y1 - data.blocks[0].bbox.y0
              }`,
            },
          },
        })

        handleOpenBoundingBoxModal()
        // Open the modal soon after selection
        // handleOpen()
      })

      // EVENT: Fires when the annotation is updated
      annotorious.on("updateAnnotation", async (annotation) => {
        // Check if the selected tag exists in the predefined
        // degree tags array
        const tagExists = annotation.body.every((tag) =>
          predefinedDegreeTags.includes(tag.value)
        )

        // If tag not exist, then remove the annotation
        // and stop the further execution
        if (!tagExists) {
          annotorious.removeAnnotation(annotation)
          return
        }

        // Destructuring the bounding box coords
        const [left, top, width, height] = annotation.target.selector.value
          .split("xywh=pixel:")[1]
          .split(",")

        // Getting the image with bounding boxes
        const imageWithBBox = annotation.target.source

        // Preparing the rectangle
        const rectangle = { height, width, left, top }

        const data = await doOCR(imageWithBBox, rectangle)

        // Shrink the bounding box
        annotorious.addAnnotation({
          ...annotation,
          target: {
            selector: {
              ...annotation.target.selector,
              value: `xywh=pixel:${data.blocks[0].bbox.x0},${
                data.blocks[0].bbox.y0
              },${data.blocks[0].bbox.x1 - data.blocks[0].bbox.x0},${
                data.blocks[0].bbox.y1 - data.blocks[0].bbox.y0
              }`,
            },
          },
        })

        // Open the modal soon after selection
        // handleOpen()
      })

      // EVENT: Fires when the annotation is deleted
      annotorious.on("deleteAnnotation", (annotation) => {
        console.log("deleted", annotation)
      })
    }

    // Keep current Annotorious instance in state
    setAnno(annotorious)

    // Cleanup: destroy current instance
    return () => annotorious.destroy()

    // eslint-disable-next-line
  }, [])

  // Create QRCode.
  // Serialize BBox values using Protobuf and store inside QRCode.

  // Attach the QRCODE on Degree image, then download it.
  const downloadImage = async () => {
    try {
      const transformedImage = await mergeImages([
        { src: degreeImage },
        {
          src: QRCodeImg,
          x: QRCodeX ? QRCodeX - degreeImageBoundries.x : 45,
          y: QRCodeY ? QRCodeY - degreeImageBoundries.y : 380,
        },
      ])

      saveAs(transformedImage, "degree-image-with-qrcode")
      setOpenSnackbar({
        open: true,
        message: "Successfully downloaded!",
        backgroundColor: theme.palette.success.main,
      })
    } catch (err) {
      console.log("Cannot merge QRCODE with Degree Image: ", err)
    }
  }

  // Take image with QRCODE, then read values from it.
  // Draw bounding boxes on that image based on these values.
  const uploadImageWithQRCODEHandler = (e) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        const imageWithQRCode = reader.result
        setDegreeImage(imageWithQRCode)

        QrScanner.scanImage(imageWithQRCode)
          .then((result) => {
            console.log("QRCODE DETECTED")

            console.log({ result })

            // New Code with Comma Seprated String
            const splittedResult = result.split(":")

            console.log({ splittedResult })

            let boundingBoxes = []

            for (let i = 0; i < splittedResult.length - 1; i++) {
              const boundingBox = splittedResult[i].split(",")
              boundingBoxes.push({
                type: boundingBox[0],
                regex: boundingBox[1],
                x: boundingBox[2],
                y: boundingBox[3],
                width: boundingBox[4],
                height: boundingBox[5],
              })
            }

            console.log({ boundingBoxes })

            // Transform the bounding boxes according to annotorious
            // library standard to draw the bounding boxes on image.
            const transformedBoundingBoxes = boundingBoxes.map(
              (boundingBox, index) => {
                return {
                  "@context": "http://www.w3.org/ns/anno.jsonld",
                  id: `#a88b22d0-6106-4872-9435-c78b5e89fede-${index}`,
                  type: "Annotation",
                  body: [
                    {
                      type: "TextualBody",
                      value: "It's Hallstatt in Upper Austria",
                    },
                  ],
                  target: {
                    selector: {
                      type: "FragmentSelector",
                      conformsTo: "http://www.w3.org/TR/media-frags/",
                      value: `xywh=pixel:${boundingBox.x},${boundingBox.y},${boundingBox.width},${boundingBox.height}`,
                    },
                  },
                }
              }
            )

            transformedBoundingBoxes.forEach((boundingBox) =>
              anno.addAnnotation(boundingBox)
            )
          })
          .catch((err) => {
            console.log("No QRCODE Found!", err)
          })
      }
    }

    const file = e.target.files[0]

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  // Drag and Drop Feature for QRCode.
  const qrCodeCanvasElement = document.getElementById("qrcode-canvas")

  if (isBBoxFinalized) {
    const options = {
      setCursor: true,
      // limit: {
      //   // boundary limitations
      //   x: [220, 1014],
      //   y: [123, 659],
      // },
      onDrag: (_qrCodeCanvasElement, x, y) => {
        setQRCodeX(x)
        setQRCodeY(y)
      },
    }

    new Draggable(qrCodeCanvasElement, options)
  }

  const handleSubmit = () => {
    const transformedCurrentBoundingBox = {
      ...currentBoundingBox,
      type: isBoundingBoxStatic,
      regex: regex,
    }

    if (isBoundingBoxStatic === "static")
      delete transformedCurrentBoundingBox.regex

    setBoundingBoxesWithType((prevBoundingBoxes) => [
      ...prevBoundingBoxes,
      transformedCurrentBoundingBox,
    ])

    setIsBoundingBoxStatic("static")
    setRegex(``)

    handleCloseBoundingBoxModal()
  }

  // Custom Templates Button
  //   const plusHandler = () => {
  //     if (!plusForOpen) {
  //       setPlusForOpen("You can add custom template here");
  //       // onDegreeImageChange()
  //     } else {
  //       setPlusForOpen(false);
  //     }
  //   };

  const boundingBoxModalJSX = (
    <Dialog open={openBoundingBoxModal} onClose={handleCloseBoundingBoxModal}>
      <DialogTitle>Bounding Box Type</DialogTitle>
      <DialogContent sx={{ width: "450px" }}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Select Bounding Box Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={isBoundingBoxStatic}
            onChange={handleChangeRadioButton}
          >
            <FormControlLabel
              value="static"
              control={<Radio />}
              label="Static"
            />
            <FormControlLabel
              value="dynamic"
              control={<Radio />}
              label="Dynamic"
            />
          </RadioGroup>
        </FormControl>
        <br />
        {isBoundingBoxStatic === "dynamic" && (
          <TextField
            variant="standard"
            label="Regex"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )

  const snackbarActionJSX = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() =>
        setOpenSnackbar({
          open: false,
          message: ``,
          backgroundColor: ``,
        })
      }
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )
  // let studentNameResponse = "";
  // let fatherNameResponse = "";
  // let serialNoResponse = "";
  // let rollNoResponse = "";
  // let registrationNoResponse = "";
  // let degreeTitleResponse = "";
  const Enable = () => {
    setUmair(true)
  }
  // const Verify = () => {
  //   console.log(responses)
  // }

  const degree_Verify = async (e) => {
    e.preventDefault()

    try {
      // const responses = ["149644\n", "516\n"] // Assuming responses is an array containing data
      const formattedResponses = {
        rollNo: responses[0].trim(), // Trim newline characters
        obtainNo: responses[1].trim(), // Trim newline characters
      }
      console.log(formattedResponses)
      const { data } = await api.post(
        "/api/docs-verification",
        formattedResponses
      )
      console.log(data)
      // setVerification(true)
      toast.success(
        `${data.get_degree.name} is verified with institute: ${data.get_degree.institute} by grw board`,
        {
          duration: 5000, // Duration in milliseconds (e.g., 5000 ms = 5 seconds)
          className: "custom-toast", // Apply the custom CSS class
        }
      )
      console.log(data.get_degree)
    } catch (error) {
      // setUnVerification(true)
      console.error("Error during verification:", error)
      toast.error(error.response.data.message)
    }
  }

  const degree_add = async (e) => {
    e.preventDefault()
    // console.log(state);
    try {
      const formattedResponses = {
        rollNo: responses[0].trim(), // Trim newline characters
        obtainNo: responses[1].trim(), // Trim newline characters
        name: responses[2].trim(), // Trim newline characters
        institute: responses[3].trim(), // Trim newline characters
      }
      setLoader(true)
      const { data } = await api.post("/api/docs-register", formattedResponses)
      setLoader(false)
      // localStorage.setItem("Editro_token", data.token)
      toast.success(data.message)
      console.log(data)
    } catch (error) {
      setLoader(false)
      toast.error(error.response.data.message)
      console.log(error.response)
    }
  }

  //   const degree_Verify = async (e) => {
  //     console.log(responses)
  //     e.preventDefault()
  //     // console.log(state);
  //     try {
  //       // setLoader(true)
  //       const { data } = await api.post("/api/docs-verification", { responses })
  //       console.log("verification is start")
  //       //   setLoader(false)
  //       //   setResponses([])
  //       console.log(data)
  //     } catch (error) {
  //       //   setLoader(false)
  //       console.log(error.response)
  //     }
  //   }
  const Disable = () => {
    setUmair(false)
  }
  return (
    // Simple as that homePage and others template
    <div className="flex flex-col items-center mt-20  min-h-auto ">
      {/* {verification ? (
        <div className="h-[40%] w-[50%] bg-white flex justify-center items-center z-40 absolute top-[55vh] left-[30vw]">
          <h1 className="text-7xl text-green-600">
            Verification is successful
          </h1>
          <p
            className="absolute top-1 right-1 text-7xl cursor-pointer"
            onClick={() => setVerification(false)}
          >
            X
          </p>
        </div>
      ) : (
        ""
      )}
      {unVerification ? (
        <div className="h-[40%] w-[50%] bg-white flex justify-center items-center z-40 absolute top-[55vh] left-[30vw]">
          <h1 className="text-7xl text-red-600">Not verified</h1>
          <p
            className="absolute top-1 right-1 text-7xl cursor-pointer"
            onClick={() => setUnVerification(false)}
          >
            X
          </p>
        </div>
      ) : (
        ""
      )} */}
      <div className="h-20 flex justify-center items-center  shadow-2xl w-full">
        <p className="text-white text-4xl font-bold ">
          Here You can Upload picture of your Result card to verify
        </p>
      </div>
      {/* <div className="absolute left-0 top-62">
    <div>
      <Button className="capitalize" variant="outlined">
        Degree Template
      </Button>
    </div>
    <div>
      <Button className="capitalize" variant="outlined">
        Transcript Template
      </Button>
    </div>
    <div>
      <Button className="capitalize" variant="outlined">
        CNIC Template
      </Button>
    </div>
    <div>
      <Button variant="outlined" onClick={plusHandler}>
        +
      </Button>
    </div>
  </div> */}

      {/* For adding a custom template */}
      <div className="flex flex-col items-center">
        {boundingBoxModalJSX}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openSnackbar.open}
          autoHideDuration={4000}
          onClose={() =>
            setOpenSnackbar({
              open: false,
              message: ``,
              backgroundColor: ``,
            })
          }
          message={openSnackbar.message}
          action={snackbarActionJSX}
          ContentProps={{
            style: {
              backgroundColor: openSnackbar.backgroundColor,
            },
          }}
        />
        {plusForOpen && JSON.stringify(boundingBoxesWithType)}

        <div className="flex flex-row justify-center items-center gap-3em my-6">
          <div className="mx-2">
            <label htmlFor="degree-upload-button">
              <Input
                accept="image/*"
                id="degree-upload-button"
                multiple
                type="file"
                onChange={onDegreeImageChange}
              />

              <Button
                disableElevation
                className="capitalize "
                variant="contained"
                component="span"
                onClick={Enable}
              >
                Upload Document
              </Button>
            </label>
          </div>

          <div className="mx-2">
            <Button
              className="capitalize"
              disableElevation
              variant="contained"
              onClick={downloadImage}
              disabled={!degreeImage || !QRCode}
            >
              Download Image
            </Button>
          </div>

          <div className="mx-2">
            <label htmlFor="image-with-qr-code">
              <Input
                accept="image/*"
                id="image-with-qr-code"
                multiple
                type="file"
                onChange={uploadImageWithQRCODEHandler}
              />

              <Button
                disableElevation
                className="capitalize"
                variant="outlined"
                component="span"
              >
                Upload Image With QRCODE
              </Button>
            </label>
          </div>
        </div>
        <div id="container-el">
          <div style={{ display: degreeImage ? "block" : "none" }}>
            <img
              id="degree-img"
              ref={imgEl}
              src={degreeImage ? degreeImage : "./demo.png"}
              alt="user-degree-img"
            />
            <canvas
              style={{
                visibility: isBBoxFinalized ? "visible" : "hidden",
                position: "absolute",
                top: 375,
                left: 260,
              }}
              id="qrcode-canvas"
            ></canvas>
          </div>
        </div>

        {degreeImage && (
          <div
            className="flex justify-center gap-4em"
            style={{ margin: "1em 0" }}
          >
            <div>
              <Button
                disabled={tool === "rect"}
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handleRectangleTool}
              >
                Rectangle
              </Button>
            </div>
            <div>
              <Button
                disabled={tool === "polygon"}
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handlePolygonTool}
              >
                Polygon
              </Button>
            </div>
          </div>
        )}

        {umair ? (
          <div className="p-6 bg-slate-300 rounded-lg absolute right-6 top-24 shadow-2xl">
            <button
              className="text-4xl absolute -left-12 p-2 bg-slate-300 rounded-tl-lg rounded-bl-lg"
              onClick={Disable}
            >
              <MdKeyboardArrowRight />
            </button>
            <div className=" font-bold text-2xl">
              Welcome to Editro Docs Scanner
            </div>
            <div className=" text-slate-400 pl-8 pt-2">
              Verify Your Document Here!
            </div>
            <div className="flex my-8 ">
              <div className="pr-4">
                <div
                  className={`bg-slate-100 border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center mb-2 text-gray-400 ${
                    selectedTags.length > 0 ? "hidden" : ""
                  }`}
                >
                  First Select Roll #
                </div>

                {selectedTags.length > 0 && (
                  <div>
                    <ul>
                      {selectedTags.map((tag, index) => (
                        <li
                          className=" bg-slate-100 border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center mb-2"
                          key={index}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {selectedTags.length === 1 && (
                      <div className="text-gray-400 bg-slate-100 border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center mb-2">
                        Select Obtain Number
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <ul>
                  {responses.map((response, index) => (
                    <li
                      className=" bg-slate-100 border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center mb-2"
                      key={index}
                    >
                      {response}
                    </li>
                  ))}
                  {selectedTags.length < 2 && (
                    <div className="text-gray-400 bg-slate-100 border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center mb-2">
                      ____________
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <button
              className={`flex items-center justify-center w-full p-2 hover:font-bold text-white rounded-lg ${
                selectedTags.length < 2 ? "bg-gray-400" : "bg-blue-700"
              }`}
              onClick={degree_Verify}
              disabled={selectedTags.length < 2}
            >
              <p>Verify</p>
            </button>
            {/* <button
              className={`flex items-center justify-center w-full p-2 mt-4 hover:font-bold text-white rounded-lg ${
                selectedTags.length < 4 ? "bg-gray-400" : "bg-green-700"
              }`}
              onClick={degree_add}
            >
              create
            </button> */}
          </div>
        ) : (
          <button
            className="text-4xl absolute right-0 top-28 p-2 bg-slate-300 rounded-tl-lg rounded-bl-lg shadow-2xl"
            onClick={Enable}
          >
            <MdKeyboardArrowLeft />
          </button>
        )}
      </div>
    </div>
  )
}

export default DegreeVerification
