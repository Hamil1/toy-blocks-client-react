import React from "react";
import Block from "./Block";
import "./List.css";

const List: React.FC<Props> = ({ blocks, error, loading }) => {
  return (
    <div className="container">
      {loading && <div>Loading blocks...</div>}
      {error && <div>Error loading blocks...</div>}
      {blocks!.length === 0 && !error && !loading ? (
        <div>No blocks found.</div>
      ) : (
        blocks?.map((block, index) => <Block key={index} block={block} />)
      )}
    </div>
  );
};

export default List;

type Props = {
  blocks: any[] | null;
  loading: boolean;
  error: boolean;
};
