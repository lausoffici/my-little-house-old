import { FC, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiUserAddLine } from "react-icons/ri";

import StudentsForm, { IFormData } from "student/StudentsForm";
import studentsApi from "student/api";
import { IStudent } from "types";

interface Props {
  handleAddStudent: (student: IStudent) => void;
}

const AddStudentDrawer: FC<Props> = ({ handleAddStudent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<IFormData>();
  const btnRef = useRef<HTMLButtonElement>();
  const toast = useToast();

  async function onSubmit(inputs: IFormData) {
    try {
      const newStudent = await studentsApi.create(inputs);
      handleAddStudent(newStudent);
      toast({
        title: "Éxito!",
        description: "Nuevo alumno añadido",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al intentar agregar el alumno",
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
      <Button
        onClick={onOpen}
        leftIcon={<RiUserAddLine />}
        size="sm"
        bgColor="brand.800"
        color="white"
        fontWeight="thin"
        _hover={{ bgColor: "brand.750" }}
        _active={{ bgColor: "brand.700" }}
        _focus={{ outlineColor: "brand.700" }}
        p={5}
      >
        Nuevo Alumno
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crear Alumno</DrawerHeader>
          <DrawerBody>
            <StudentsForm form={form} />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={form.handleSubmit(onSubmit)}>
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddStudentDrawer;
