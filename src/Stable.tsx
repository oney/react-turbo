import {
  createEvent,
  createStore,
  Event,
  is,
  Store,
  Subscription,
} from "effector";
import React from "react";

export class Stable extends React.Component {
  proxy: {};
  cache: {
    [key: string | symbol]: [Store<any>, Event<any>, Subscription | null];
  } = {};
  ren: any;
  constructor(props: any) {
    super(props);
    const that = this;
    this.proxy = new Proxy(
      {},
      {
        get(_, prop) {
          // console.log("ProxypppUUU3", that.props);
          // console.log("ProxypppUUU", prop);
          if (that.cache[prop]) return that.cache[prop][0];
          const props = that.props as any;
          // console.log("Proxyppp1", props);
          const p = props[prop];
          // console.log("Proxyppp2", p);
          const set = createEvent<any>();
          const store = createStore(is.store(p) ? p.getState() : p).on(
            set,
            (_b, n) => n
          );
          let unwatch = null;
          if (is.store(p)) {
            unwatch = p.watch((d) => {
              // console.log("wwww", prop);
              set(d);
            });
          }
          that.cache[prop] = [store, set, unwatch];
          return that.cache[prop][0];
        },
      }
    );
    this.ren = React.createElement((this.props as any).__rt_type__, {
      // @ts-ignore
      return___: (...args) => this.props.return___(...args),
      proxy: this.proxy,
    });
  }
  componentDidUpdate(prevProps: any) {
    const prev: { [key: string | symbol]: any } = prevProps;
    const props: { [key: string | symbol]: any } = this.props as any;
    // console.log("componentDidUpdate44");
    for (const key in props) {
      const store = this.cache[key];
      if (!store) continue;

      if (props[key] === prev[key]) continue;

      const p = props[key];
      store[1](is.store(p) ? p.getState() : p);

      let unwatch = null;
      if (is.store(p)) {
        unwatch = p.watch((d) => {
          // console.log("wwww2", key);
          store[1](d);
        });
      }
      this.cache[key][2] = unwatch;
    }
    for (const key in prev) {
      const store = this.cache[key];
      if (!store) continue;

      if (!(key in props)) {
        store[1](undefined);
        this.cache[key][2] = null;
      }
    }
  }
  // shouldComponentUpdate() {
  //   console.log("shouldComponentUpdate888");
  //   return false;
  // }
  render(): React.ReactNode {
    // console.log("render888");
    // return React.createElement((this.props as any).type, { proxy: this.proxy });
    return this.ren;
  }
}
