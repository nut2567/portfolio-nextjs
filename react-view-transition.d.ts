import type * as React from "react";

declare module "react" {
  export const ViewTransition: React.ComponentType<{
    name: string;
    children?: React.ReactNode;
  }>;
}
