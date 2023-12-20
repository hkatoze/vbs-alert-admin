import "./VideoBlock.css";
import VIDEO from "../../../../../../../assets/video.mp4";
const VideoBlock = () => {
  return (
    <div className="videoBlock flex">
      <h1>Create and sell extraordinary products</h1>
      <p>The world's fast growing industry today are natural made products !</p>
      <div className="buttons flex">
        <button className="btn">Explore More</button>
        <button className="btn transparent">Top sellers</button>
      </div>
      <div className="videoDiv">
        <video src={VIDEO} autoPlay loop muted></video>
      </div>
    </div>
  );
};

export default VideoBlock;
