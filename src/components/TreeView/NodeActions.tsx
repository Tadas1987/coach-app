import { FC } from 'react';
import { TreeNodeType } from 'src/types';
import { MdDelete, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

interface Props {
  treeNode: TreeNodeType;
  nodes: TreeNodeType[];
  index: number;
  moveNode: (node: TreeNodeType, destination: number) => void;
  deleteTreeItem: (node: TreeNodeType, nodes: TreeNodeType[]) => void;
}

export const NodeActions: FC<Props> = (props) => {
  const { treeNode, nodes, moveNode, deleteTreeItem, index } = props;
  let position: number = treeNode.position;

  return (
    <div className="node-actions">
      <MdDelete
        onClick={() => deleteTreeItem(treeNode, nodes)}
        className="delete-icon"
      />
      {nodes.length > 1 && (
        <>
          {(index === nodes.length - 1 || index) !== 0 && (
            <MdArrowUpward
              className="move-icon"
              onClick={() => moveNode(treeNode, position - 1)}
            />
          )}
          {index !== nodes.length - 1 && (
            <MdArrowDownward
              className="move-icon"
              onClick={() => moveNode(treeNode, position + 1)}
            />
          )}
        </>
      )}
    </div>
  );
};
