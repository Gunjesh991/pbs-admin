import { useEffect, useRef, useState } from "react";

const ImageUpload = ({ setImage = null, preview = "", refresh = true }) => {
  let ref = useRef(null);

  const [localUrl, setLocalUrl] = useState(null);

  useEffect(() => {
    if (!preview.length) return;
    setLocalUrl(preview);
  }, [preview]);

  const onChange = (e) => {
    const file = e.target.files[0];
    if (!refresh) {
      const url = URL.createObjectURL(file);
      setLocalUrl(url);
    }
    setImage && typeof setImage == "function" && setImage(file);
  };

  return (
    <div className="image__input">
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={false}
        ref={ref}
        onChange={onChange}
      />
      <div onClick={() => ref.current?.click()} className="placebo">
        {localUrl && <img src={localUrl} alt="local selected" />}
        {!localUrl && <p>Add Photo</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
