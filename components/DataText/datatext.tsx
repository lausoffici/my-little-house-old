import { Text } from "@chakra-ui/react";

function DataText({ children, data }) {
  return (
    <Text>
      <span style={{ color: "#e76f51" }}>{data}</span>
      {children}
    </Text>
  );
}

export default DataText;
