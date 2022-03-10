import { Button } from "@chakra-ui/react";

function MyButton({ onClick, icon, children }) {
  return (
    <Button
      onClick={onClick}
      leftIcon={icon}
      size="sm"
      bgColor="brand.800"
      color="white"
      fontWeight="thin"
      _hover={{ bgColor: "brand.750" }}
      _active={{ bgColor: "brand.700" }}
      _focus={{ outlineColor: "brand.700" }}
      p={5}
    >
      {children}
    </Button>
  );
}

export default MyButton;
