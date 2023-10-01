import { FC, useState } from 'react';
import { TreeNodeType } from '../../../types';
import { NodeActions } from '../node-actions/NodeActions';
import { NodeLabel } from '../node-label/NodeLabel';


import './styles.css';
import { ExpandButton } from '../node-actions/ExpandButton';

interface Props {
  treeNode: TreeNodeType;
  index: number;
  nodes: TreeNodeType[];
  deleteTreeItem: (node: TreeNodeType, nodes: TreeNodeType[]) => void;
  moveNode: (node: TreeNodeType, destination: number) => void;
}

export const TreeNode: FC<Props> = (props) => {
  const {
    treeNode,
    index,
    nodes,
    deleteTreeItem,
    moveNode,
  } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const itemClass = treeNode.children.length > 0 ? 'tree-node tree-node-expandable' : 'tree-node';

  return (
    <li aria-expanded={isExpanded} role="treeitem">
      <div className={itemClass} onClick={() => setIsExpanded(!isExpanded)}>
        <div className="expand-button-container">
          {treeNode.children.length > 0 && (
            <ExpandButton handleExpand={setIsExpanded} isExpanded={isExpanded}/>
          )}
        </div>
        <NodeLabel
          email={treeNode.email}
          fullName={treeNode.fullName}
        />
        <NodeActions
          treeNode={treeNode}
          deleteTreeItem={deleteTreeItem}
          index={index}
          nodes={nodes}
          moveNode={moveNode}
        />
      </div>
      {isExpanded &&
        treeNode.children &&
        treeNode.children.map((node, index, array) => {
          return (
            <ul key={node.id}>
              <TreeNode
                treeNode={node}
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
