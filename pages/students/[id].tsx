import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";

import studentsApi from "student/api";
import { IStudent } from "types";

type Props = {
  student: IStudent;
};

const StudentDetailPage: React.FC<Props> = ({ student }) => {
  const router = useRouter();
  const { lastName, firstName, description, courses, email, address } = student;

  return (
    <Box h="100vh" w="100%" p={5} bgColor="brand.50">
      <Box bgColor="white" borderRadius="lg" p={5} position="relative" h="full">
        <Button
          size="sm"
          position="absolute"
          color="gray.600"
          left={5}
          variant="ghost"
          leftIcon={<AiOutlineArrowLeft />}
          onClick={() => router.back()}
        >
          Volver
        </Button>
        <Heading size="2xl" textAlign="center">
          {lastName.toUpperCase()}, {firstName}
        </Heading>

        <Flex direction="column" textAlign="left" flex={1} gap={2}>
          <Heading size="lg">Datos</Heading>
          <Text>Nombre: {firstName}</Text>
          <Text>Apellido: {lastName}</Text>
          <Text>Dirección: {address}</Text>
          <Text>Email: {email}</Text>
          <Text>Comentarios: {description}</Text>
          <Text>Cursos</Text>
          <UnorderedList>
            {courses.map((c) => (
              <ListItem key={c}>{c}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
        <Box textAlign="left" flex={1}>
          <Heading size="lg">Cuotas</Heading>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const student = await studentsApi.findOne(id as string);

  return {
    props: {
      student,
    },
  };
};
