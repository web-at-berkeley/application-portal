import { ReactNode } from "react";

import Responsive from "./Responsive";

// only renders its children if the screen is smaller than "lg", e.g. when viewing on a mobile device
export default function MobileOnly({ children }: { children: ReactNode }) {
  return <Responsive max="lg">{children}</Responsive>;
}
