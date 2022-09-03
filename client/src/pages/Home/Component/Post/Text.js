import React from "react";

function Text({ text, root }) {
  const lists = text.split("\n");
  return (
    <>
      {lists.map((x, index) => {
        return (
          <React.Fragment key={index}>
            {x}
            {index < lists.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Text;
