import { useMemo, useState } from "react";
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
  Badge,
} from "@chakra-ui/react";
import { capitalize, normalize } from "utils/common";

import AddStudentDrawer from "student/AddStudentDrawer";
import { IStudent } from "types";

import { RiSearchLine } from "react-icons/ri";
import Link from "next/link";
import dbConnect from "utils/dbConnect";
import { getAllStudents } from "pages/api/students";
import { getAllCourses } from "pages/api/courses";

interface Props {
  students: IStudent[];
  courseOptions: { value: string; label: string }[];
}

const Page = ({ students, courseOptions }: Props) => {
  const [studentList, setStudentList] = useState<IStudent[]>(students);
  const [inputValue, setInputValue] = useState("");

  function handleAddStudent(student: IStudent) {
    setStudentList([...studentList, student]);
  }

  const filteredList = useMemo(
    () =>
      studentList.filter(
        (s) =>
          normalize(s.lastName).includes(normalize(inputValue)) ||
          normalize(s.firstName).includes(normalize(inputValue))
      ),
    [inputValue, studentList]
  );

  return (
    <VStack w="100%" h="100vh" bgColor="gray.50" p={5}>
      <HStack mb={5} w="100%">
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
        <AddStudentDrawer
          handleAddStudent={handleAddStudent}
          courseOptions={courseOptions}
        />
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
          ))}
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
                Cursos
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredList.map(({ _id, firstName, lastName, courses }) => (
              <Link href={"/students/" + _id} key={_id} passHref>
                <Tr role="button" _hover={{ bg: "brand.50" }}>
                  <Td>
                    {lastName.toUpperCase()}, {capitalize(firstName)}
                  </Td>
                  <Td>
                    {courses.map((c) => (
                      <Badge key={c} mx={1} colorScheme="purple">
                        {capitalize(c)}
                      </Badge>
                    ))}
                  </Td>
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
  await dbConnect();

  const students = await getAllStudents();

  const courses = await getAllCourses();
  const courseOptions = courses.map(({ name }) => ({
    value: name,
    label: name,
  }));

  return {
    props: {
      students,
      courseOptions,
    },
  };
};
