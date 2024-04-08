"use client";
import { useBoolean, useDisclosure, Button } from "@chakra-ui/react";
import { FaServer } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";
import AuthForm from "../AuthComponents/AuthForm";
import { FaUserCircle } from "react-icons/fa";
import ProfileBar from "../ProfileBar/ProfileBar";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

const NavBar = () => {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  const {
    isOpen: isAuthOpen,
    onOpen: onAuthOpen,
    onClose: onAuthClose,
  } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

  const [loggedIn, setLoggedIn] = useBoolean();
  const [studentName, setStudentName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  useEffect(() => {
    const checkLogInStatus = async () => {
      const { isLoggedIn } = await axios
        .get("http://localhost:3000/api/auth/me")
        .then((res) => res.data)
        .catch((error) => console.log(error));

      isLoggedIn ? setLoggedIn.on() : setLoggedIn.off();
    };
    checkLogInStatus();
  });

  const studentInfo = async () => {
    const { student } = await axios
      .get("http://localhost:3000/api/auth/me")
      .then((res) => res.data)
      .catch((error) => console.log(error));

    if (!student) {
      alert("User no loggedin");
    }

    setStudentName(student.studentName);
    setInstituteName(student.instituteName);
    console.log(studentName, instituteName);
  };

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
          className="w-[40%] absolute right-1/2 top-0 translate-x-1/2 bg-brand.5 cursor-pointer rounded-xl flex items-center justify-start"
          onClick={() => onSearchOpen()}
        >
          <span className="ml-6 py-3 text-brand.4">Search Project</span>
        </div>
        {loggedIn ? (
          <div
            className="m-0 text-teal-500 text-4xl mr-6 cursor-pointer"
            onClick={() => {
              studentInfo();
              onProfileOpen();
            }}
          >
            <FaUserCircle />
          </div>
        ) : (
          <div className="mr-6">
            <Button
              colorScheme="teal"
              py={6}
              fontWeight="normal"
              onClick={onAuthOpen}
            >
              Register | Login
            </Button>
          </div>
        )}
      </div>
      <div>
        <SearchBar isOpen={isSearchOpen} onClose={onSearchClose} />
      </div>
      <div>
        <AuthForm isOpen={isAuthOpen} onClose={onAuthClose} />
      </div>
      <div>
        <ProfileBar
          isOpen={isProfileOpen}
          onClose={onProfileClose}
          studentName={studentName}
          instituteName={instituteName}
        />
      </div>
    </div>
  );
};

export default NavBar;
