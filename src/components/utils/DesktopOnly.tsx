import { ReactNode } from "react";

import Responsive from "./Responsive";

// only renders its children if the screen is bigger than "lg", e.g. when viewing on a computer
export default function DesktopOnly({ children }: { children: ReactNode }) {
  return <Responsive min="lg">{children}</Responsive>;
}
