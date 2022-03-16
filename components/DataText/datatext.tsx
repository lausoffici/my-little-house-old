import { Text } from "@chakra-ui/react";
import theme from "theme";

function DataText({ children, data }) {
  return (
    <Text>
      <span style={{ color: theme.colors.brand[800] }}>{data}</span>
      {children}
    </Text>
  );
}

export default DataText;
