import { Button, ButtonProps } from "@chakra-ui/button";
import Link from "next/link";

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

// combines Chakra Button and Next Link into a single component
// useful for any place where buttons are used as links
export default function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} passHref>
      <Button {...props} />
    </Link>
  );
}
