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
  Grid,
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
  const { lastName, firstName, description, courses, email, address, active } =
    student;

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

          <Grid rowGap={2}>
            <DataText data="Estado: ">
              <Badge
                verticalAlign="baseline"
                colorScheme={active ? "green" : "gray"}
              >
                {active ? " activo" : "inactivo"}
              </Badge>
            </DataText>
            <DataText data="Nombre: ">{capitalize(firstName)}</DataText>
            <DataText data="Apellido: ">{capitalize(lastName)}</DataText>
            <DataText data="Cursos: ">
              {courses?.map((course) => (
                <Badge
                  key={course}
                  verticalAlign="baseline"
                  colorScheme="purple"
                >
                  {course}
                </Badge>
              ))}
            </DataText>

            <DataText data="Dirección: ">{capitalize(address)}</DataText>
            <DataText data="Email: ">{email}</DataText>
            <Text color="brand.800">Contacto:</Text>
            {description && (
              <Text
                bgColor="#f3f3f3"
                borderRadius="sm"
                p={3}
                whiteSpace="pre-line"
                w="fit-content"
              >
                {capitalize(description)}
              </Text>
            )}
          </Grid>
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
