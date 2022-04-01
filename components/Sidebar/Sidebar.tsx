import { Box, VStack, Heading, Divider, Icon, Flex } from "@chakra-ui/react";
import { FiSmile, FiMonitor, FiLock } from "react-icons/fi";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const LinkItems = [
  { name: "Estudiantes", icon: FiSmile, href: "/students" },
  { name: "Cursos", icon: FiMonitor, href: "/courses" },
  { name: "Caja", icon: FiLock, href: "/caja" },
];

function Sidebar() {
  return (
    <Box w="80" h="full" bgColor="white">
      <VStack spacing={5}>
        <Image
          src="/assets/logo.png"
          alt="my little house logo"
          width={150}
          height={150}
        />
        <Heading fontSize="xl" mb={5}>
          My Little House
        </Heading>
        <Divider />
      </VStack>
      <Box pt={5}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
}

const NavItem = ({ icon, children, href }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Link href={href} passHref>
      <Flex
        borderRight={path === href ? "2px" : "0px"}
        borderRightColor="brand.400"
        align="center"
        m="4"
        role="group"
        cursor="pointer"
        fontWeight={path === href ? "700" : "400"}
        _hover={{
          color: "brand.400",
        }}
        _active={{ color: "brand.300" }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "brand.400" }}
            as={icon}
          />
        )}
        <a>{children}</a>
      </Flex>
    </Link>
  );
};

export default Sidebar;
