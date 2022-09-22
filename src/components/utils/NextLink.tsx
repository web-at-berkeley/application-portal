import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import Link from "next/link";

interface LinkProps extends ChakraLinkProps {
  href: string;
}

// combines Chakra Link and Next Link into a single component
// this allows styling links with Chakra while also using the Next router
export default function NextLink({ href, ...props }: LinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink {...props} />
    </Link>
  );
}
