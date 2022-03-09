import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `Josefin Sans, ${base.fonts?.heading}`,
    body: `Alata, ${base.fonts?.body}`,
  },
  colors: {
    brand: {
      // verdes
      50: "#E4F3F1",
      100: "#AFDAD5",
      200: "#7AC2B9",
      300: "#5FB6AB",
      400: "#2A9D8F",

      // azules
      500: "#415D69",
      550: "#264653",

      //amarillonaranjado
      600: "#e9c46a",
      650: "#f4a261",

      //naranja
      700: "#F0A592",
      750: "#ED937D",
      800: "#e76f51",

      //casi negro
      900: "#2B2933",
    },
  },
});

export default theme;
