import { GetServerSideProps } from "next";
import {
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { IStudent } from "types";
import apiClient from "utils/apiClient";

interface Props {
  students: IStudent[];
}

const Page: React.FC<Props> = ({ students }) => {
  return (
    <VStack spacing={5}>
      <Heading textAlign="center">Alumnos</Heading>
      <Input placeholder="Buscar" />
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Apellido y Nombre</Th>
            <Th>Curso</Th>
          </Tr>
        </Thead>
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
