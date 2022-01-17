import React from "react";
import Split from "react-split";

const Task1 = () => {
  return (
    <div className="mainSplit">
      <Split
        direction="vertical"
        style={{ height: "calc(100vh)" }}
        sizes={[50, 50, 0]}
        minSize={[200, 200, 0]}
      >
        <Split
          style={{ display: "flex" }}
          sizes={[0, 35, 65, 0]}
          minSize={[0, 100, 100, 0]}
        >
          <div />
          <Split direction="vertical" sizes={[0, 100, 0]} minSize={[0, 200, 0]}>
            <div />
            <div className="window1"></div>
            <div />
          </Split>
          <Split direction="vertical" sizes={[0, 100, 0]} minSize={[0, 200, 0]}>
            <div />
            <div className="window2"></div>
            <div />
          </Split>
          <div />
        </Split>
        <Split
          style={{ display: "flex" }}
          sizes={[0, 100, 0]}
          minSize={[0, 100, 0]}
        >
          <div />
          <div className="window3"></div>
          <div />
        </Split>
        <div />
      </Split>
    </div>
  );
};

export default Task1;
