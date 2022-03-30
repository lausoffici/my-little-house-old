import { Button } from "@chakra-ui/react";

function DeleteButton({ children, onClick, ...props }) {
  return (
    <Button
      size="md"
      colorScheme="red"
      fontWeight="semiBold"
      _focus={{ outlineColor: "red", outlineWidth: "2px" }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}

export default DeleteButton;
