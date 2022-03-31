import { Button } from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";

function DeleteButton({ onClick, size }) {
  return (
    <Button
      size={size}
      onClick={onClick}
      colorScheme="red"
      leftIcon={<AiTwotoneDelete />}
      fontWeight="semiBold"
      border="0px"
      _focus={{ outlineColor: "red", outlineWidth: "2px" }}
    >
      Eliminar
    </Button>
  );
}

export default DeleteButton;
