import { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { TreeNodeType } from 'src/types';

interface Props {
  treeNode: TreeNodeType;
  nodes: TreeNodeType[];
  deleteNode: (node: TreeNodeType, nodes: TreeNodeType[]) => void;
}

export const DeleteNode: FC<Props> = (props) => {
  const { treeNode, nodes, deleteNode } = props;

  return (
    <MdDelete
      onClick={() => deleteNode(treeNode, nodes)}
      className="delete-icon"
    />
  );
};
