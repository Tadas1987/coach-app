import { FC, useState } from 'react';
import { Coach, TreeNodeType } from '../../../types';
import { NodeActions } from '../node-actions/NodeActions';
import { NodeLabel } from '../node-label/NodeLabel';
import { MdExpandMore } from 'react-icons/md';

import './styles.css';

interface Props {
  treeNode: TreeNodeType;
  index: number;
  nodes: TreeNodeType[];
  deleteTreeItem: (node: TreeNodeType, nodes: TreeNodeType[]) => void;
  moveNode: (node: TreeNodeType, destination: number) => void;
  parentCoachFullName?: Coach['fullName'];
}

export const TreeNode: FC<Props> = (props) => {
  const {
    treeNode,
    parentCoachFullName,
    index,
    nodes,
    deleteTreeItem,
    moveNode,
  } = props;
  const [expandChildren, setExpandChildren] = useState(false);

  return (
    <li>
      <div className="tree-node">
        {treeNode.children.length > 0 && (
          <button onClick={() => setExpandChildren(!expandChildren)}>
            <MdExpandMore />
          </button>
        )}
        <NodeLabel
          email={treeNode.email}
          fullName={treeNode.fullName}
          parentCoachFullName={parentCoachFullName}
        />
        <NodeActions
          treeNode={treeNode}
          deleteTreeItem={deleteTreeItem}
          index={index}
          nodes={nodes}
          moveNode={moveNode}
        />
      </div>
      {expandChildren &&
        treeNode.children &&
        treeNode.children.map((node, index, array) => {
          return (
            <ul key={node.id}>
              <TreeNode
                treeNode={node}
                parentCoachFullName={treeNode.fullName}
                deleteTreeItem={deleteTreeItem}
                index={index}
                nodes={array}
                moveNode={moveNode}
              />
            </ul>
          );
        })}
    </li>
  );
};
