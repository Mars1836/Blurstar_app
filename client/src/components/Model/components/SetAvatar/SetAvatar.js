import { useState, useRef, useEffect } from "react";
import userRequest from "../../../../httprequest/user";
import { useUser } from "../../../../services/RequireAuth";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import styles from "./SetAvatar.module.scss";
import classnames from "classnames/bind";
import { Slider } from "@mui/material";
import { Button } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import LoadingPage from "~/components/Loading/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { ModelContext } from "../../Model";
import { useContext } from "react";
import { mainUserApiAction } from "~/store/actions/mainUserAction";
const cx = classnames.bind(styles);
function SetAvatar() {
  const model = useContext(ModelContext);
  const dispatch = useDispatch();
  const [fileValue, setFileValue] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [cropper, setCropper] = useState("");
  const [cropURL, setCropURL] = useState("");
  const [size, setSize] = useState(50);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.mainUser.data?._id);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const reader = new FileReader();
    reader.readAsDataURL(fileUpload);
    reader.onloadend = () => {
      setLoading(false);
      model.handleClose();
      dispatch(mainUserApiAction.fetchUpdateAvatar(cropURL, userId));
    };
  };
  const handleFileUploadChange = (e) => {
    cropper && setCropURL(cropper?.getCroppedCanvas().toDataURL());
    setSize(50);
    const file = e.target.files[0];
    setFileValue(e.target.value);
    previewFile(file);
    setFileUpload(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDataSource(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  var cropperRef = useRef(null);
  const handleCrop = function () {
    setCropURL(cropper.getCroppedCanvas().toDataURL());
  };

  const handleResize = (e) => {
    let resize = e.target.value - size;
    if (cropper) {
      cropper.zoom(resize / 100);
    }
    setSize(e.target.value);
  };
  useEffect(() => {}, [cropURL]);
  return (
    <div
      className={cx("wrapper")}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {loading && <LoadingPage></LoadingPage>}
      <div className={cx("header")}>
        <p className={cx("title")}>Update profile picture</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          handleCrop();
        }}
      >
        <div htmlFor="upload-photo" className={cx("label-upload-photo")}>
          <Button
            variant="outlined"
            component="label"
            size="large"
            startIcon={<AddToPhotosIcon />}
          >
            Upload Photo
            <input
              id="upload-photo"
              type="file"
              className={cx("upload-photo")}
              name="avatar"
              value={fileValue}
              onChange={handleFileUploadChange}
            ></input>
          </Button>
        </div>
      </form>
      <div className={cx("crop-wrapper")}>
        {dataSource && (
          <>
            <div className={cx("crop-image")}>
              <div className={cx("imagecrop")}>
                <Cropper
                  src={dataSource}
                  //   style={{ width: "100%" }}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  initialAspectRatio={1 / 1}
                  guides={false}
                  ref={cropperRef}
                  cropBoxResizable={false}
                  background={false}
                  dragMode={"move"}
                  zoomOnWheel={false}
                  minContainerWidth={300}
                  cropBoxMovable={false}
                ></Cropper>
              </div>
              <Slider
                size="small"
                value={size}
                onChange={handleResize}
                aria-label="Small"
              />
              <Button variant="outlined" size="medium" onClick={handleCrop}>
                Crop
              </Button>
            </div>
            <div className={cx("preview-avatar")}>
              <p className={cx("title")}>Preview avatar</p>
              <img src={cropURL} className={cx("avatar")}></img>
              <Button
                variant="outlined"
                size="medium"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                disabled={!Boolean(cropURL)}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default SetAvatar;
