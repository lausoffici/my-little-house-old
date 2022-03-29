import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import DeleteButton from "components/DeleteButton";
import { AiTwotoneDelete } from "react-icons/ai";
import { IStudent } from "types";
import studentsApi from "student/api";

import { useRouter } from "next/router";

interface Props {
  student: IStudent;
}

const RemoveStudent: React.FC<Props> = ({ student }) => {
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
      <DeleteButton onClick={onOpen} size="md" p={0} leftIcon="">
        <AiTwotoneDelete />
      </DeleteButton>

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
            <DeleteButton onClick={handleRemoveStudent} size="sm">
              Eliminar
            </DeleteButton>
            <Button
              variant="ghost"
              mx={2}
              size="sm"
              onClick={onClose}
              _focus={{ outlineColor: "brand.700", outlineWidth: "2px" }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveStudent;
