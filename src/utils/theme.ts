import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    TODO: {
      blue: "#1e40af",
      lightBlue: "#456ced",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: {
      "*": {
        boxSizing: "border-box",
      },
      "html, body": {
        padding: 0,
        margin: 0,
        height: "100%",
        width: "100%",
      },
      a: {
        color: "inherit",
        textDecoration: "none",
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        overflowWrap: "anywhere",
      },
    },
    Text: {
      baseStyle: {
        overflowWrap: "anywhere",
      },
    },
    Button: {
      variants: {
        blue: {
          bg: "TODO.blue",
          color: "white",
          _hover: {
            bg: "TODO.lightBlue",
            _active: {
              bg: "TODO.lightBlue",
            },
          },
        },
      },
    },
  },
});
