"use client";
import { Button, useDisclosure } from "@chakra-ui/react";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineCloudUpload } from "react-icons/md";
import Link from "next/link";
import PostProjectForm from "@/components/PostProject/PostProjectForm";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex text-center flex-col items-center justify-center text-brand.3 text-6xl mt-32 w-[45%]">
        A platform to showcase
        <span className="text-brand.2">projects done by students</span>
      </div>
      <div className="w-[40%] text-center justify-center items-center text-brand.4 text-xl mt-16">
        An integrated platform where in all the universities/colleges provide
        information about the projects done by the students to help in peer
        learning and cross functional research between various
        universities/colleges
      </div>
      <div className="mt-16 flex items-center gap-12">
        <Link href={"/explore"}>
          <Button
            leftIcon={<MdOutlineExplore />}
            colorScheme="teal"
            variant="solid"
            size="lg"
          >
            Explore
          </Button>
        </Link>

        <Button
          rightIcon={<MdOutlineCloudUpload />}
          colorScheme="gray"
          variant="outline"
          size="lg"
          textColor={"gray.50"}
          _hover={{ bg: "brand.5" }}
          onClick={() => {
            onOpen();
          }}
        >
          Upload Project
        </Button>
        <PostProjectForm isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
}
