import type { Dispatch } from "react";
import React from "react";
import { createEvent, createStore, Store } from "effector";

export function useAtom<S>(
  initialState: S | (() => S)
): [Store<S>, Dispatch<S>] {
  // console.log("useState444");
  return React.useMemo((): [Store<S>, Dispatch<S>] => {
    const initial =
      initialState instanceof Function ? initialState() : initialState;
    const set = createEvent<S>();
    const $store = createStore(initial).on(set, (_b, n) => n);

    return [$store, createStore(set) as any];
  }, []);
}
