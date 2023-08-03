// [1, 2, 3, 4] => 4
export function arrayLastElement(list) {
  if(!Array.isArray(list) || list.length <= 0) {
    return undefined;
  }

  return list[list.length - 1];
}
