import { FC, useMemo, useState } from 'react';
import { deleteCoach, updateCoach } from 'src/api/http';
import { useCoaches } from 'src/pages/CoachContext';
import { Coach, NodeMap, TreeNodeType } from 'src/types';
import { TreeNode } from './TreeNode';

interface Props {
  coachList: Coach[];
}

export const TreeView: FC<Props> = (props) => {
  const { coachList } = props;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { setCoaches } = useCoaches();

  const memoizedNodes = useMemo(() => {
    if (coachList) {
      return buildTreeList(coachList);
    }
  }, [coachList]);

  return (
    <div>
      <ul>
        {memoizedNodes?.map((node, index, array) => {
          return (
            <TreeNode
              key={index}
              treeNode={node}
              index={index}
              nodes={array}
              deleteTreeItem={deleteTreeItem}
              moveNode={moveNode}
            />
          );
        })}
      </ul>
    </div>
  );

  function buildTreeList(data: Coach[]) {
    const dataCopy: Coach[] = JSON.parse(JSON.stringify(data));

    const map: NodeMap = {};
    const roots: TreeNodeType[] = [];
    let node: Coach;
    let i: number;

    for (i = 0; i < dataCopy.length; i++) {
      map[dataCopy[i].id] = i;
      dataCopy[i].children = [];
    }

    for (i = 0; i < dataCopy.length; i++) {
      node = dataCopy[i];

      if (node.parentCoach !== null) {
        dataCopy[map[node.parentCoach]].children?.push(node);
        dataCopy[map[node.parentCoach]].children?.sort(
          (a, b) => a.position - b.position
        );
      } else {
        roots.push(node as TreeNodeType);
      }
    }

    return roots;
  }

  function deleteTreeItem(treeItem: TreeNodeType, nodes: TreeNodeType[]) {
    if (isProcessing) return;

    setIsProcessing(true);

    deleteCoach(treeItem.id).then(() => {
      let itemIndex: number;
      const coachesListCopy: Coach[] = JSON.parse(JSON.stringify(coachList));
      const sameLevelNodes: Coach[] = [];
      let itemToDelete: Coach | null = null;
      const children: Coach[] = [];
      let sameLevelNodesCount = nodes.length > 1 ? nodes.length : 1;
      let itemsToUpdate: Coach[] = [];

      for (let i = 0; i < coachesListCopy.length; i++) {
        if (coachesListCopy[i].id === treeItem.id) {
          itemToDelete = coachesListCopy[i];
        }

        if (coachesListCopy[i].parentCoach === treeItem.id) {
          coachesListCopy[i].parentCoach = treeItem.parentCoach;
          children.push(coachesListCopy[i]);
        }

        if (coachesListCopy[i].parentCoach === treeItem.parentCoach) {
          sameLevelNodes.push(coachesListCopy[i]);
        }
      }

      if (itemToDelete) {
        const reorderedSameLevelItems = reorderNodePositions(
          sameLevelNodes,
          itemToDelete
        );

        if (reorderedSameLevelItems !== null) {
          itemsToUpdate = [...reorderedSameLevelItems];
        }

        if (children.length > 0) {
          children
            .sort((a, b) => a.position - b.position)
            .forEach((item) => (item.position = sameLevelNodesCount++));

          itemsToUpdate = [...itemsToUpdate, ...children];
        }

        itemIndex = coachesListCopy.indexOf(itemToDelete);
        coachesListCopy.splice(itemIndex, 1);

        updateCollection(itemsToUpdate);
        setCoaches(coachesListCopy);
      }

      setIsProcessing(false);
    });
  }

  function moveNode(node: TreeNodeType, destination: number) {
    if (isProcessing) return;
    setIsProcessing(true);
    const coachesListCopy: Coach[] = JSON.parse(JSON.stringify(coachList));
    let itemToMove: Coach | null = null;

    for (let i = 0; i < coachesListCopy.length; i++) {
      if (coachesListCopy[i].id === node.id) {
        itemToMove = coachesListCopy[i];

        break;
      }
    }

    const itemToSwitch = coachesListCopy.find(
      (element) =>
        element.parentCoach === itemToMove?.parentCoach &&
        element.position === destination
    );

    if (itemToSwitch && itemToMove !== null) {
      itemToSwitch.position = itemToMove?.position;
      itemToMove.position = destination;

      updateCoach(itemToSwitch.id, itemToSwitch)
        .then(() => {
          if (itemToMove !== null) {
            updateCoach(itemToMove.id, itemToMove).then(() =>
              setCoaches(coachesListCopy)
            );
          }
        })
        .finally(() => setIsProcessing(false));
    } else {
      setIsProcessing(false);
    }
  }

  function updateCollection(items: Coach[]) {
    items.forEach((item) => updateCoach(item.id, item));
  }

  function reorderNodePositions(
    nodes: Coach[],
    itemToDelete: Coach
  ): Coach[] | null {
    const nodesToUpdate: Coach[] = [];
    let positionToRemove = itemToDelete.position;

    nodes.splice(nodes.indexOf(itemToDelete), 1);
    nodes.forEach((node) => {
      if (node.position > positionToRemove) {
        node.position = node.position - 1;

        nodesToUpdate.push(node);
      }
    });

    return nodesToUpdate.length ? nodesToUpdate : null;
  }
};
