"use client";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

import { useRouter } from "next/navigation";

const ProfileBar = ({ isOpen, onClose, studentName, instituteName }) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const { success } = await axios
      .get("http://localhost:3000/api/auth/logout")
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));

    if (success) {
      onClose();
      localStorage.setItem("isLoggedIn", false);
      router.refresh();
    }
  };
  return (
    <div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"brand.1"}>
          <DrawerCloseButton color={"white"} />
          <DrawerBody>
            <DrawerHeader color={"brand.2"} textAlign={"center"}>
              {studentName}
            </DrawerHeader>
          </DrawerBody>
          <DrawerFooter>
            <div
              className="mx-auto border border-brand.4 px-4 py-2 rounded text-brand.4 cursor-pointer"
              onClick={handleLogOut}
            >
              LogOut
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProfileBar;
