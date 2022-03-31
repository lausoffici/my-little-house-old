import { Button, ButtonProps } from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";

function DeleteButton(props: ButtonProps) {
  return (
    <Button
      colorScheme="red"
      leftIcon={<AiTwotoneDelete />}
      fontWeight="semiBold"
      border="0px"
      _focus={{ outlineColor: "red", outlineWidth: "2px" }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default DeleteButton;
