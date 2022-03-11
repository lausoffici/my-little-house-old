import { whiten } from "@chakra-ui/theme-tools";

export const InputStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    outline: {
      field: {
        border: "2px solid",
        bg: "white",
        _focus: {
          borderColor: "brand.400",
          boxShadow: "none",
        },
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "outline",
  },
};

export const ButtonStyles = {
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "brand.800",
      color: "white",
      _hover: {
        bg: whiten("brand.800", 15),
      },
      _active: {
        bg: whiten("brand.800", 20),
      },
      _focus: {
        boxShadow: "none",
        outlineColor: "brand.700",
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
