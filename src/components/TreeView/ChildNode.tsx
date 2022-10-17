import { FC } from 'react';
import { Coach, TreeNodeType } from '../../types';
import { TreeNode } from './TreeNode';

interface Props {
  treeNode: TreeNodeType[];
  parentCoachFullName: Coach['fullName'];
  deleteTreeItem: (node: TreeNodeType, nodes: TreeNodeType[]) => void;
  moveNode: (node: TreeNodeType, destination: number) => void;
}

export const ChildNode: FC<Props> = (props) => {
  const { treeNode, parentCoachFullName, deleteTreeItem, moveNode } = props;

  return (
    <>
      {treeNode.map((node, index, array) => {
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
  );
};
