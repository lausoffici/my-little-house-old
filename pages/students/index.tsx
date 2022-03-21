import { useState } from "react";
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
  InputLeftElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { capitalize, removeAccents } from "../../utils/common";

import studentsApi from "student/api";
import AddStudentDrawer from "student/AddStudentDrawer";
import { IStudent } from "types";

import { RiSearchLine } from "react-icons/ri";
import Link from "next/link";

interface Props {
  students: IStudent[];
}

const Page: React.FC<Props> = ({ students }) => {
  const [studentList, setStudentList] = useState<IStudent[]>(students);
  const [inputValue, setInputValue] = useState("");

  function handleAddStudent(student: IStudent) {
    setStudentList([...studentList, student]);
  }

  const orderStudents = students.sort((a, b) => {
    const lowerA = removeAccents(a.lastName.toLowerCase());
    const lowerB = removeAccents(b.lastName.toLowerCase());
    return lowerA > lowerB ? 1 : lowerA < lowerB ? -1 : 0;
  });

  return (
    <VStack w="100%" h="100vh" bgColor="brand.50" p={5} spacing={4}>
      <HStack w="100%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <RiSearchLine />
          </InputLeftElement>
          <Input
            placeholder="Buscar"
            bgColor="white"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputGroup>
        <AddStudentDrawer handleAddStudent={handleAddStudent} />
      </HStack>
      <HStack w="100%">
        <Select
          color="gray.500"
          size="sm"
          borderRadius="5"
          placeholder="Filtrar por cursos"
          bg="white"
          border="2px solid"
          _focus={{ borderColor: "brand.400" }}
        >
          {students.map(({ courses, _id }) => (
            <option key={_id}>{courses}</option>
          ))}{" "}
          {/* no filtra pues hay que armar los cursos */}
        </Select>
      </HStack>
      <Box overflowY="auto" w="100%" mt={5}>
        <Table colorScheme="gray" size="sm" bgColor="white">
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
          <Tbody>
            {orderStudents
              .filter(
                (f) =>
                  removeAccents(f.lastName.toLowerCase()).includes(
                    inputValue
                  ) ||
                  removeAccents(f.firstName.toLowerCase()).includes(
                    inputValue
                  ) ||
                  inputValue === ""
              )
              .map(({ _id, firstName, lastName, courses }) => (
                <Link href={"/students/" + _id} key={_id} passHref>
                  <Tr role="button" _hover={{ bg: "brand.50" }}>
                    <Td>
                      {lastName.toUpperCase()}, {capitalize(firstName)}
                    </Td>
                    <Td>{courses.join(" / ")}</Td>
                  </Tr>
                </Link>
              ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await studentsApi.findAll();

  return {
    props: {
      students: students,
    },
  };
};
