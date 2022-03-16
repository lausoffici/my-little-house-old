import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Heading,
  Divider,
  ListItem,
  ListIcon,
  List,
  HStack,
  VStack,
} from "@chakra-ui/react";
import DataText from "components/DataText";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineEdit, AiOutlinePaperClip } from "react-icons/ai";

import studentsApi from "student/api";
import { IStudent } from "types";
import { capitalize } from "utils/common";

interface Props {
  student: IStudent;
}

const StudentDetailPage: React.FC<Props> = ({ student }) => {
  const router = useRouter();
  const { lastName, firstName, description, courses, email, address } = student;

  return (
    <Box h="100vh" w="100%" p={5} bgColor="brand.50">
      <Box bgColor="white" borderRadius="md" p={5} position="relative" h="full">
        <Button
          size="sm"
          position="absolute"
          color="gray.600"
          left={5}
          variant="ghost"
          leftIcon={<AiOutlineArrowLeft />}
          onClick={router.back}
        >
          Volver
        </Button>
        <Heading size="2xl" textAlign="center" my="4" mt={{ base: 12, lg: 4 }}>
          {lastName.toUpperCase()}, {firstName}
        </Heading>

        <VStack>
          {/* DATOS */}
          <Card>
            <HStack justify="space-between" w="full">
              <Heading size="md">DATOS</Heading>
              <Button leftIcon={<AiOutlineEdit />}>Editar</Button>
              {/* Cambiar por buttonprimary una vez mergeada branch styles */}
            </HStack>
            <Divider />
            <DataText data="Apellido: ">{capitalize(lastName)}</DataText>
            <DataText data="Nombre: ">{capitalize(firstName)}</DataText>
            <DataText data="Dirección: ">{capitalize(address)}</DataText>
            <DataText data="Email: ">{email}</DataText>
            <DataText data="Comentarios: ">{description}</DataText>
            <DataText data="Cursos: ">
              <List>
                {courses.map((c) => (
                  <ListItem key={c}>
                    <ListIcon as={AiOutlinePaperClip} />
                    {capitalize(c)}
                  </ListItem>
                ))}
              </List>
            </DataText>
          </Card>

          {/* CUOTAS */}
          <Card>
            <HStack justify="space-between" align="center" w="100%">
              <Heading size="md">CUOTAS</Heading>
            </HStack>
            <Divider />
          </Card>
        </VStack>
      </Box>
    </Box>
  );
};

const Card = ({ children }) => (
  <VStack
    alignItems="start"
    spacing={4}
    bg="gray.50"
    p={5}
    borderRadius="lg"
    w="100%"
  >
    {children}
  </VStack>
);

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
