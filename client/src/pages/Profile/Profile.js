import { useState } from "react";
import userRequest from "../../httprequest/user";
import { useUser } from "../../services/RequireAuth";
function Profile() {
  const [fileValue, setFileValue] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const { user, setReload } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const reader = new FileReader();
    console.log(fileUpload);
    reader.readAsDataURL(fileUpload);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };
  const handleFileUploadChange = (e) => {
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
      console.log(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };
  const uploadImage = (base64EncodedImage) => {
    userRequest
      .userUploadAvatar(base64EncodedImage, user._id)
      .then(({ data }) => {
        setReload(Math.random());
      });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="file"
          name="avatar"
          value={fileValue}
          onChange={handleFileUploadChange}
        ></input>
        <button>Send</button>
      </form>
      {dataSource && <img src={dataSource} width={500}></img>}
    </div>
  );
}
export default Profile;
