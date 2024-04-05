"use client";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";

const ProjectDetails = ({
  isOpen,
  onClose,
  title,
  description,
  domainName,
  instituteName,
}) => {
  const router = useRouter();

  return (
    <>
      <Modal
        isOpen={isOpen}
        size={"2xl"}
        onClose={() => {
          router.back();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent bg={"brand.1"}>
          <ModalBody>
            <div
              className="text-gray-50 flex items-center justify-end mr-4 mt-4 cursor-pointer text-3xl"
              onClick={() => {
                router.back();
                onClose;
              }}
            >
              <IoCloseSharp />
            </div>
            <Card bg={"brand.1"} textColor={"brand.4"}>
              <CardHeader>
                <Heading size="md" textColor={"teal.400"}>
                  {title}
                </Heading>
              </CardHeader>

              <CardBody>
                <Stack spacing="4">
                  <Box>
                    <Heading size="sm" textColor={"teal.400"}>
                      Institute
                    </Heading>
                    <Text pt="2" fontSize="xs">
                      {instituteName}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="sm" textColor={"teal.400"}>
                      Domain
                    </Heading>
                    <Text pt="2" fontSize="xs">
                      {domainName}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="sm" textColor={"teal.400"}>
                      Description
                    </Heading>
                    <Text pt="2" fontSize="xs">
                      {description}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectDetails;
