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
} from "@chakra-ui/react";
import { capitalize, normalize } from "utils/common";

import courseApi from "course/api";
import AddCourseDrawer from "course/AddCourseDrawer";
import { ICourse } from "types";

import { RiSearchLine } from "react-icons/ri";
import Link from "next/link";

interface Props {
  courses: ICourse[];
}

const Page: React.FC<Props> = ({ courses }) => {
  const [coursesList, setCoursesList] = useState<ICourse[]>(courses);
  const [inputValue, setInputValue] = useState("");

  function handleAddCourse(course: ICourse) {
    setCoursesList([...coursesList, course]);
  }

  const filteredList = useMemo(
    () =>
      coursesList.filter((c) =>
        normalize(c.name).includes(normalize(inputValue))
      ),
    [inputValue, coursesList]
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
        <AddCourseDrawer handleAddCourse={handleAddCourse} />
      </HStack>
      <Box overflowY="auto" w="100%" mt={5}>
        <Table colorScheme="gray" size="sm" bgColor="white">
          <Thead>
            <Tr>
              <Th py={3} fontSize="sm" bgColor="brand.200" color="brand.50">
                Nombre
              </Th>
              <Th bgColor="brand.200" color="brand.50">
                Importe
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredList.map(({ _id, name, amount }) => (
              <Link href={"/courses/" + _id} key={_id} passHref>
                <Tr role="button" _hover={{ bg: "brand.50" }}>
                  <Td>{capitalize(name)}</Td>
                  <Td>
                    {amount.toLocaleString("es-AR", {
                      currency: "ARS",
                      style: "currency",
                    })}
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
  const courses = await courseApi.findAll();

  return {
    props: {
      courses: courses,
    },
  };
};
