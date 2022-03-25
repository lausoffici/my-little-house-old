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
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import DataText from "components/DataText";
import DeleteButton from "components/DeleteButton";
import UpdateStudentDrawer from "student/UpdateStudentDrawer";
import { AiOutlineArrowLeft } from "react-icons/ai";

import studentsApi from "student/api";
import { IStudent } from "types";
import { capitalize } from "utils/common";

interface Props {
  student: IStudent;
}

const StudentDetailPage: React.FC<Props> = ({ student }) => {
  const router = useRouter();

  const { lastName, firstName, description, courses, email, address } = student;
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleUpdateStudent(student: IStudent) {
    console.log(123);
  }

  return (
    <>
      <Box minHeight="100vh" w="100%" p={5} bgColor="brand.50">
        <Box
          bgColor="white"
          borderRadius="md"
          p={5}
          position="relative"
          h="full"
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
          <Heading
            size="2xl"
            textAlign="center"
            my="4"
            mt={{ base: 12, lg: 4 }}
          >
            {lastName.toUpperCase()}, {firstName}
          </Heading>

          <VStack>
            {/* DATOS */}
            <Card>
              <HStack w="full" justify="space-between">
                <Heading size="md">DATOS</Heading>
                <HStack spacing={2}>
                  <UpdateStudentDrawer
                    student={student}
                    handleUpdateStudent={handleUpdateStudent}
                  />
                  <DeleteButton onClick={onOpen} size="md" />
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
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            ¿Eliminar a {student.lastName} {student.firstName}?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Esta acción no podrá revertirse</Text>
          </ModalBody>

          <ModalFooter>
            <DeleteButton onClick={onClose} size="sm" />
            <Button variant="ghost" mx={2} size="sm">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
