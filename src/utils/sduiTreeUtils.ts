import { SDUIComponentNode } from '../types/sdui';

export const findNodeById = (
  nodes: SDUIComponentNode[],
  id: string
): SDUIComponentNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findParentAndIndex = (
  nodes: SDUIComponentNode[],
  id: string,
  parent: SDUIComponentNode | null = null
): { parent: SDUIComponentNode | null; index: number; siblings: SDUIComponentNode[] } | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) {
      return { parent, index: i, siblings: nodes };
    }
    if (nodes[i].children && nodes[i].children!.length > 0) {
      const found = findParentAndIndex(nodes[i].children!, id, nodes[i]);
      if (found) return found;
    }
  }
  return null;
};

export const updateNodeById = (
  nodes: SDUIComponentNode[],
  id: string,
  updates: Partial<SDUIComponentNode>
): SDUIComponentNode[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        ...updates,
        props: {
          ...(node.props || {}),
          ...(updates.props || {}),
        },
        styles: {
          ...(node.styles || {}),
          ...(updates.styles || {}),
        },
      };
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeById(node.children, id, updates),
      };
    }
    return node;
  });
};

export const removeNodeById = (
  nodes: SDUIComponentNode[],
  id: string
): SDUIComponentNode[] => {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: removeNodeById(node.children, id),
        };
      }
      return node;
    });
};

export const insertNode = (
  nodes: SDUIComponentNode[],
  parentId: string | null,
  index: number | null,
  newNode: SDUIComponentNode
): SDUIComponentNode[] => {
  if (!parentId) {
    const copy = [...nodes];
    const targetIdx = index !== null && index >= 0 && index <= copy.length ? index : copy.length;
    copy.splice(targetIdx, 0, newNode);
    return copy;
  }

  return nodes.map((node) => {
    if (node.id === parentId) {
      const children = node.children ? [...node.children] : [];
      const targetIdx = index !== null && index >= 0 && index <= children.length ? index : children.length;
      children.splice(targetIdx, 0, newNode);
      return { ...node, children };
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: insertNode(node.children, parentId, index, newNode),
      };
    }
    return node;
  });
};

export const moveNodeDirection = (
  nodes: SDUIComponentNode[],
  id: string,
  direction: 'up' | 'down'
): SDUIComponentNode[] => {
  const result = findParentAndIndex(nodes, id);
  if (!result) return nodes;

  const { parent, index, siblings } = result;
  const targetIndex = direction === 'up' ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= siblings.length) return nodes;

  const newSiblings = [...siblings];
  const [removed] = newSiblings.splice(index, 1);
  newSiblings.splice(targetIndex, 0, removed);

  if (!parent) {
    return newSiblings;
  }

  return updateNodeById(nodes, parent.id, { children: newSiblings });
};

const generateNewId = (prefix: string) => `${prefix}_${Math.random().toString(36).substring(2, 9)}`;

export const cloneNodeWithNewIds = (node: SDUIComponentNode): SDUIComponentNode => {
  return {
    ...node,
    id: generateNewId(node.type),
    children: node.children ? node.children.map(cloneNodeWithNewIds) : undefined,
  };
};

export const duplicateNode = (
  nodes: SDUIComponentNode[],
  id: string
): SDUIComponentNode[] => {
  const result = findParentAndIndex(nodes, id);
  if (!result) return nodes;

  const original = result.siblings[result.index];
  const cloned = cloneNodeWithNewIds(original);

  return insertNode(nodes, result.parent ? result.parent.id : null, result.index + 1, cloned);
};

export interface FlatTreeNode {
  node: SDUIComponentNode;
  depth: number;
  parentId: string | null;
  hasChildren: boolean;
}

export const flattenTree = (
  nodes: SDUIComponentNode[],
  depth = 0,
  parentId: string | null = null
): FlatTreeNode[] => {
  let result: FlatTreeNode[] = [];
  for (const node of nodes) {
    const hasChildren = Boolean(node.children && node.children.length > 0);
    result.push({ node, depth, parentId, hasChildren });
    if (hasChildren) {
      result = result.concat(flattenTree(node.children!, depth + 1, node.id));
    }
  }
  return result;
};
