import { GetServerSideProps } from "next";
import {
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  HStack,
  Box,
  Button,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { IStudent } from "types";
import apiClient from "utils/apiClient";
import { RiUserAddLine, RiSearchLine } from "react-icons/ri";

interface Props {
  students: IStudent[];
}

const Page: React.FC<Props> = ({ students }) => {
  return (
    <VStack w="100%" h="100vh" bgColor="brand.50" p={5}>
      <HStack mb={5} w="100%">
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<RiSearchLine />} />
          <Input
            placeholder="Buscar"
            bgColor="white"
            _focus={{ borderColor: "brand.400" }}
          />
        </InputGroup>
        <Button
          leftIcon={<RiUserAddLine />}
          size="sm"
          bgColor="brand.800"
          color="white"
          fontWeight="thin"
          _hover={{ bgColor: "brand.750" }}
          _active={{ bgColor: "brand.700" }}
          _focus={{ outlineColor: "brand.700" }}
          p={5}
        >
          Nuevo Alumno
        </Button>
      </HStack>
      <Table>
        <Thead>
          <Tr>
            <Th py={3} fontSize="sm" bgColor="brand.200" color="brand.50">
              Apellido y Nombre
            </Th>
            <Th bgColor="brand.200" color="brand.50">
              Curso
            </Th>
          </Tr>
        </Thead>
      </Table>
      <Box overflowY="auto" w="100%">
        <Table colorScheme="gray" size="sm" bgColor="white">
          <Tbody>
            {students.map((student) => {
              return (
                <Tr key={student._id}>
                  <Td>
                    {student.lastName.toUpperCase()}, {student.firstName}
                  </Td>
                  <Td>FCE</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await apiClient.get("students");
  const students: IStudent[] = res.data.students;

  return {
    props: {
      students: students,
    },
  };
};
