import { Coach, NodeMap, TreeNodeType } from 'src/types';

export const buildTreeList = (data: Coach[]) => {
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
};
