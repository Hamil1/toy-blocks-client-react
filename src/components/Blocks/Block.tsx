import React from "react";
import "./Block.css";

const Block: React.FC<Props> = ({ block }) => {
  return (
    <div className="block-container">
      <div className="block-id">{block.id}</div>
      <div className="block-data">{block.attributes.data}</div>
    </div>
  );
};

export default Block;

type Props = {
  block: any;
};
