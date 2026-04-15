import { IMAGE_URL } from "../../utils/constants";
import "./loader.css";

export const Loader = () => {
    
  return (
   <div className="loader-overlay">
  <div className="loader-box">

    {/* 🔥 Smoke Layers */}
    <div className="smoke"></div>
    <div className="smoke smoke2"></div>

    <div className="om">ॐ</div>

    <h1 className="shivsetu-text">SHIV SETU</h1>

    <div className="loading-text">Loading Divine Experience...</div>

  </div>
</div>
  );
};

export default Loader;