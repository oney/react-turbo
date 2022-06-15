import React from "react";
import { ReactifyKey } from "./constants";
import { Stable } from "./Stable";
import { Watch } from "./Watch";

export class Wrapper extends React.Component<{ [key: string]: any }> {
  render(): React.ReactNode {
    const { __rt_type__: type } = this.props;
    if (typeof type !== "string" && type[ReactifyKey]) {
      return <Stable {...this.props} />;
    }
    // @ts-ignore
    return <Watch {...this.props} />;
  }
}
