import { FC } from "react";
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
import PrimaryButton from "components/PrimaryButton";

import CourseForm, { IFormData } from "course/CourseForm";
import courseApi from "course/api";
import { ICourse } from "types";

interface Props {
  handleAddCourse: (student: ICourse) => void;
}

const AddCourseDrawer: FC<Props> = ({ handleAddCourse }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<IFormData>();
  const toast = useToast();

  async function onSubmit(inputs: IFormData) {
    try {
      const newCourse = await courseApi.create(inputs);
      handleAddCourse(newCourse);
      toast({
        title: "Éxito!",
        description: "Nuevo curso añadido",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al intentar agregar el curso",
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
      <PrimaryButton onClick={onOpen} leftIcon={<RiUserAddLine />}>
        Nuevo Curso
      </PrimaryButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Crear Curso</DrawerHeader>
          <DrawerBody>
            <CourseForm form={form} />
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              _focus={{ borderColor: "gray.300" }}
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <PrimaryButton onClick={form.handleSubmit(onSubmit)}>
              Guardar
            </PrimaryButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCourseDrawer;
