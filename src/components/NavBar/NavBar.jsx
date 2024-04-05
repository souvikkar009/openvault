"use client";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FaServer } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="sticky top-0 py-4">
      <div className="flex justify-between w-full items-center relative">
        <Link href={"/"}>
          <div className="flex items-center">
            <div className="text-3xl text-brand.2 ml-6">
              <FaServer />
            </div>
            <div className="ml-2 text-brand.3 text-3xl">OpenVault</div>
          </div>
        </Link>

        <div
          className="m-0 w-[40%] h-12 absolute right-1/2 top-0 translate-x-1/2 bg-brand.5 cursor-pointer rounded-xl flex items-center justify-start"
          onClick={() => onOpen()}
        >
          <span className="ml-6 text-lg text-brand.4">Search Project</span>
        </div>
        <div className="mr-6">
          <Button
            colorScheme="teal"
            px={8}
            py={6}
            fontSize={"1.125em"}
            fontWeight="normal"
          >
            Register
          </Button>
        </div>
      </div>
      <div>
        <SearchBar isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default NavBar;
