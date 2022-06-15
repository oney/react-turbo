import React from "react";
import { ReactifyKey } from "./constants";

export function reactify<P extends object>(
  Component: React.FunctionComponent<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): React.NamedExoticComponent<P> {
  const m = React.memo(Component, propsAreEqual);
  // @ts-ignore
  m[ReactifyKey] = true;
  return m;
}
