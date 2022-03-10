import { FC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

const PrimaryButton: FC<ButtonProps> = ({ onClick, leftIcon, children }) => {
  return (
    <Button
      onClick={onClick}
      leftIcon={leftIcon}
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
};

export default PrimaryButton;
