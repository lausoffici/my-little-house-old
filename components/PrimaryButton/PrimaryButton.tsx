import { FC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button size="sm" fontWeight="thin" variant="primary" p={5} {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
