import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import DeleteButton from "components/DeleteButton";
import { IStudent } from "types";
import studentsApi from "student/api";

import { useRouter } from "next/router";
import { useRef } from "react";

interface Props {
  student: IStudent;
}

const RemoveStudent: React.FC<Props> = ({ student }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  async function handleRemoveStudent() {
    try {
      await studentsApi.remove(student._id);
      toast({
        title: "Éxito!",
        description: "Se eliminó el alumno",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push("/students");
    } catch (e) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al intentar eliminar el alumno",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  }

  return (
    <>
      <DeleteButton onClick={onOpen} size="sm">
        Eliminar
      </DeleteButton>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            ¿Eliminar a {student.firstName} {student.lastName}?
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Esta acción no podrá revertirse</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="ghost" mr={2}>
              Cancelar
            </Button>
            <DeleteButton onClick={handleRemoveStudent}>Eliminar</DeleteButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveStudent;
