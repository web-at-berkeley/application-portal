import { useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

interface ResponsiveProps {
  children?: ReactNode;
}

interface ResponsiveMinProps extends ResponsiveProps {
  min: Breakpoint;
  max?: never;
}

interface ResponsiveMaxProps extends ResponsiveProps {
  min?: never;
  max: Breakpoint;
}

// renders the children only if the current breakpoint is larger than min or smaller than max
// example: <Responsive min="md"></Responsive> would only render its children
// if the screen width was larger than Chakra's "md" breakpoint
export default function Responsive({
  min,
  max,
  children,
}: ResponsiveMinProps | ResponsiveMaxProps) {
  const show = useBreakpointValue({
    [max ?? "base"]: false,
    [min ?? "base"]: true,
  });
  return show ? <>{children}</> : null;
}
