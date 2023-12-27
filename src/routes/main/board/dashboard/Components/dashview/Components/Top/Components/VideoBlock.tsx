import "./VideoBlock.css";
import VIDEO from "../../../../../../../../../assets/video.mp4";
import { Link } from "react-router-dom";
const VideoBlock = () => {
  return (
    <div className="videoBlock flex">
      <h1>Empower your phone to be your personal superhero.</h1>
      <p>Choose VBSAlert because every second matters.</p>
      <div className="buttons flex">
        <Link to="/mainpage/companiesboard/addCompany">
          <button className="btn">New company</button>
        </Link>

        <Link to="/mainpage/dashboard/alertsHistory" className="flex link">
          <button className="btn transparent">Alerts history</button>
        </Link>
      </div>
      <div className="videoDiv">
        <video src={VIDEO} autoPlay loop muted></video>
      </div>
    </div>
  );
};

export default VideoBlock;
