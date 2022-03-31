import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import DataText from "components/DataText";
import UpdateStudentDrawer from "student/UpdateStudentDrawer";
import { AiOutlineArrowLeft } from "react-icons/ai";

import studentsApi from "student/api";
import { IStudent } from "types";
import { capitalize } from "utils/common";
import RemoveStudent from "student/RemoveStudent";

interface Props {
  student: IStudent;
}

const StudentDetailPage: React.FC<Props> = ({ student }) => {
  const router = useRouter();
  const { lastName, firstName, description, courses, email, address } = student;

  return (
    <Box
      bgColor="gray.50"
      borderRadius="md"
      p={10}
      position="relative"
      minHeight="100vh"
      w="100%"
    >
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
          <HStack w="full" justify="space-between">
            <Heading size="md">DATOS</Heading>
            <HStack spacing={2}>
              <UpdateStudentDrawer student={student} />
              <RemoveStudent student={student} />
            </HStack>
          </HStack>
          <Divider />
          <DataText data="Apellido: ">{capitalize(lastName)}</DataText>
          <DataText data="Nombre: ">{capitalize(firstName)}</DataText>
          <DataText data="Dirección: ">{capitalize(address)}</DataText>
          <DataText data="Email: ">{email}</DataText>

          {courses.length && (
            <Flex align="center">
              <Text color="brand.800" lineHeight="20px">
                Cursos:
              </Text>
              {courses.map((c) => (
                <Badge key={c} mx={1} colorScheme="green">
                  {capitalize(c)}
                </Badge>
              ))}
            </Flex>
          )}

          <Text color="brand.800">Contacto:</Text>
          {description && (
            <Text
              bgColor="white"
              border="2px"
              borderRadius="lg"
              borderColor="brand.50"
              p={3}
              whiteSpace="pre-line"
            >
              {capitalize(description)}
            </Text>
          )}
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
  );
};

const Card = ({ children }) => (
  <VStack
    alignItems="start"
    spacing={4}
    bg="white"
    p={5}
    borderRadius="lg"
    w="100%"
    boxShadow="md"
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
