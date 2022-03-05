import {
  Box,
  VStack,
  Heading,
  Divider,
  Link,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FiSmile, FiMonitor, FiLock } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/router";

const LinkItems = [
  { name: "Estudiantes", icon: FiSmile, href: "/" },
  { name: "Cursos", icon: FiMonitor, href: "/cursos" },
  { name: "Caja", icon: FiLock, href: "/caja" },
];

function Sidebar() {
  const router = useRouter();
  const path = router.pathname;
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
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
      }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        role="group"
        cursor="pointer"
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
        {children}
      </Flex>
    </Link>
  );
};

export default Sidebar;
