import "./Title.scss";

export default function Title({
  isRealName,
  handleClick,
}: {
  isRealName: boolean;
  handleClick: () => void;
}) {
  return (
    <div className="screen-space">
      <h1
        className={`signature ${isRealName ? "secret" : ""}`}
        onClick={handleClick}
      >
        <div>
          <span className="l cap">a</span>
          <span className="l">i</span>
          <span className="l change L1">
            <div className="start">l</div>
            <div className="end">d</div>
          </span>
          <span className="l">a</span>
          <span className="l">n</span>
        </div>
        <div>
          <span className="l change T2">
            <div className="start">t</div>
          </span>
          <span className="l">h</span>
          <span className="l change U3">
            <div className="start">u</div>
            <div className="end">.</div>
          </span>
          <span className="l change S4">
            <div className="start">s</div>
          </span>
        </div>
      </h1>
    </div>
  );
}
