export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        // eslint-disable-next-line no-param-reassign
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        // eslint-disable-next-line no-param-reassign
        lhs[p] = rhs[p];
      }
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
