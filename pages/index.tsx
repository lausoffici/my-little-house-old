import { GetServerSideProps } from "next";
import {
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { IStudent } from "types";
import studentsApi from "student/api";
import AddStudentDrawer from "student/AddStudentDrawer";
import { useState } from "react";

interface Props {
  students: IStudent[];
}

const Page: React.FC<Props> = ({ students }) => {
  const [studentList, setStudentList] = useState<IStudent[]>(students);

  function handleAddStudent(student: IStudent) {
    setStudentList([...studentList, student]);
  }

  return (
    <VStack spacing={5}>
      <Heading textAlign="center">Alumnos</Heading>
      <AddStudentDrawer handleAddStudent={handleAddStudent} />

      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Apellido y Nombre</Th>
            <Th>Curso</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentList.map((student) => {
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
  const students = await studentsApi.list();

  return {
    props: {
      students: students,
    },
  };
};
