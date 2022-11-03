import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    convex: {
      blue: "#1e40af",
      lightBlue: "#456ced",
      grey: "#c5c5c5",
      darkGrey: "#9F9D9D",
    },
  },
  fonts: {
    heading: "Rubik, sans-serif",
    body: "Rubik, sans-serif",
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
    Checkbox: {
      baseStyle: {
        control: {
          border: "1px",
          borderColor: "#000000",
          borderRadius: "5px",
        },
      },
    },
    Text: {
      baseStyle: {
        overflowWrap: "anywhere",
      },
      variants: {
        fieldTitle: {
          color: "black",
          fontWeight: "500",
          fontSize: "20px",
          lineHeight: "24px",
        },
        fieldDescription: {
          color: "convex.grey",
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "14px",
        },
      },
    },
    Input: {
      variants: {},
    },
    Button: {
      variants: {
        blue: {
          bg: "convex.blue",
          color: "white",
          _hover: {
            bg: "convex.lightBlue",
            _active: {
              bg: "convex.lightBlue",
            },
          },
        },
      },
    },
  },
});
