import { FC } from 'react';
import { Coach, TreeNodeType } from '../../types';
import { NodeActions } from './NodeActions';
import { NodeLabel } from './NodeLabel';
import './treeViewStyles.css';

interface Props {
  treeNode: TreeNodeType;
  parentCoachFullName?: Coach['fullName'];
  index: number;
  nodes: TreeNodeType[];
  deleteTreeItem: (node: TreeNodeType, nodes: TreeNodeType[]) => void;
  moveNode: (node: TreeNodeType, destination: number) => void;
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

  return (
    <>
      <li>
        <div className="tree-node">
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
        <>
          {treeNode.children &&
            treeNode.children.map((node, index, array) => {
              return (
                <ul key={node.id}>
                  {node.children && node.children?.length > 0 ? (
                    <TreeNode
                      treeNode={node}
                      parentCoachFullName={parentCoachFullName}
                      deleteTreeItem={deleteTreeItem}
                      index={index}
                      nodes={array}
                      moveNode={moveNode}
                    />
                  ) : (
                    <TreeNode
                      treeNode={node}
                      parentCoachFullName={parentCoachFullName}
                      deleteTreeItem={deleteTreeItem}
                      index={index}
                      nodes={array}
                      moveNode={moveNode}
                    />
                  )}
                </ul>
              );
            })}
        </>
      </li>
    </>
  );
};
