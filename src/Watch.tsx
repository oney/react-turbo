import { combine, Store } from "effector";
import { useStore } from "effector-react";
import React from "react";

export type PropsStore = Store<{ [key: string]: any }>;

export interface Props {
  __rt_type__: React.FunctionComponent<any> | string;
  children: any[];
  [key: string]: any;
}

export function Watch({ __rt_type__, children, ...props }: Props): JSX.Element {
  const $props: PropsStore = combine(props ?? {}, (v) => v) as any;
  let c = children ?? [];
  c = Array.isArray(c) ? c : [c];
  const $children = combine(c, (v) => v);

  const props$ = useStore($props);
  const children$ = useStore($children);
  return React.createElement(__rt_type__, props$, ...children$);
}
