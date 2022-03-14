import {
  Box,
  Button,
  Flex,
  Heading,
  Divider,
  ListItem,
  ListIcon,
  List,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DataText from "../../components/DataText";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineEdit, AiOutlinePaperClip } from "react-icons/ai";

import studentsApi from "student/api";
import { IStudent } from "types";

type Props = {
  student: IStudent;
};

const StudentDetailPage: React.FC<Props> = ({ student }) => {
  const router = useRouter();
  const { lastName, firstName, description, courses, email, address } = student;

  function capitalize(word) {
    return String(word.charAt(0).toUpperCase() + word.slice(1));
  }

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
        <Heading size="2xl" textAlign="center" my={4}>
          {lastName.toUpperCase()}, {firstName}
        </Heading>

        <VStack width="100%">
          <Flex
            direction="column"
            textAlign="left"
            flex={1}
            gap={2}
            bg="gray.50"
            p={5}
            borderRadius={10}
            w="100%"
          >
            <HStack justify="space-between" align="center">
              <Heading size="md">DATOS</Heading>
              <Button leftIcon={<AiOutlineEdit />}>Editar</Button>
              {/* Cambiar por buttonprimary una vez mergeada branch styles */}
            </HStack>
            <Divider />
            <DataText data="Apellido: ">{capitalize(lastName)}</DataText>
            <DataText data="Nombre: ">{capitalize(firstName)}</DataText>
            <DataText data="Dirección: ">
              {address ? capitalize(address) : ""}
            </DataText>
            <DataText data="Email: ">{email}</DataText>
            <DataText data="Comentarios: ">
              {description ? capitalize(description) : ""}
            </DataText>
            <DataText data="Cursos: ">
              <List>
                {courses.map((c) => (
                  <ListItem key={c}>
                    <ListIcon as={AiOutlinePaperClip} />
                    {c ? capitalize(c) : ""}
                  </ListItem>
                ))}
              </List>
            </DataText>
          </Flex>
          <VStack
            textAlign="left"
            flex={1}
            bg="gray.50"
            p={5}
            borderRadius={10}
            w="100%"
            spacing={2}
          >
            <HStack justify="space-between" align="center" w="100%">
              <Heading size="md">CUOTAS</Heading>
            </HStack>
            <Divider />
          </VStack>
        </VStack>
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
