import { VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import studentsApi from "student/api";
import { IStudent } from "types";

type Props = {
  student: IStudent;
};

const StudentDetailPage: React.FC<Props> = ({ student }) => {
  return (
    <VStack w="100%" h="100vh" bgColor="brand.50" p={5}>
      <div>{JSON.stringify(student)}</div>
    </VStack>
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
