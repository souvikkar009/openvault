"use client";
import {
  Modal,
  ModalOverlay,
  Button,
  Input,
  ModalBody,
  ModalContent,
  useBoolean,
} from "@chakra-ui/react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { MdLogin } from "react-icons/md";

const AuthForm = ({ onClose, isOpen }) => {
  const [studentNameInput, setStudentNameInput] = useState("");
  const [studentPasswordInput, setStudentPasswordInput] = useState("");
  const [studentEmailInput, setStudentEmailInput] = useState("");
  const [instituteNameInput, setInstituteNameInput] = useState("");

  const [flag, setFlag] = useBoolean(true); // register is true

  const router = useRouter();

  const handleRegister = async () => {
    if (
      !studentEmailInput ||
      !studentPasswordInput ||
      !studentNameInput ||
      !instituteNameInput
    ) {
      alert("All fields are required!!!");
      return;
    }

    const { isRegStudent } = await axios
      .post("http://localhost:3000/api/auth/isRegStudent", {
        studentEmail: studentEmailInput,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));

    if (isRegStudent) {
      alert("Student Already Exists!");
      return;
    }

    const instituteString = instituteNameInput
      .toLocaleLowerCase()
      .replaceAll(" ", "+");

    const { isInstituteExists, instituteName, instituteId } = await axios
      .get(`http://localhost:3000/api/institutes/${instituteString}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));

    if (!isInstituteExists) {
      alert("Institute Not Exists");
      return;
    }

    await axios
      .post("http://localhost:3000/api/auth/register", {
        studentName: studentNameInput,
        studentEmail: studentEmailInput,
        instituteName,
        instituteId,
        studentPassword: studentPasswordInput,
      })
      .then((res) => {
        alert(res.data.message);
        setStudentNameInput("");
        setStudentEmailInput("");
        setStudentPasswordInput("");
        setInstituteNameInput("");
        onClose();
      });
  };

  const handleLogIn = async () => {
    if (!studentEmailInput || !studentPasswordInput) {
      alert("All fields are required!!!");
      return;
    }
    const { isRegStudent } = await axios
      .post("http://localhost:3000/api/auth/isRegStudent", {
        studentEmail: studentEmailInput,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));

    if (!isRegStudent) {
      alert("Student does not exists! Pleease Register...");
      setStudentEmailInput("");
      setStudentPasswordInput("");
      setFlag.on();
      return;
    }

    const { success, message } = await axios
      .post("http://localhost:3000/api/auth/login", {
        studentEmail: studentEmailInput,
        studentPassword: studentPasswordInput,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));

    if (success) {
      localStorage.setItem("isLoggedIn", true);
      setStudentEmailInput("");
      setStudentPasswordInput("");
      alert(message);
      onClose();
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    flag ? handleRegister() : handleLogIn();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setStudentNameInput("");
          setStudentEmailInput("");
          setStudentPasswordInput("");
          setInstituteNameInput("");
          onClose();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent bg={"brand.1"}>
          <ModalBody>
            <div className="text-gray-50 flex items-center justify-end mr-4 mt-4 text-3xl">
              <GoHome onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="flex items-center text-center justify-between text-white text-lg mt-4">
              <div
                onClick={() => {
                  if (flag) {
                    return;
                  }
                  setStudentNameInput("");
                  setStudentEmailInput("");
                  setStudentPasswordInput("");
                  setInstituteNameInput("");
                  setFlag.on();
                }}
                className={`grow py-2 ${flag && `border-t-2 border-brand.2`} ${
                  !flag && `bg-brand.5 cursor-pointer rounded`
                }`}
              >
                Register
              </div>
              <div
                onClick={() => {
                  if (!flag) {
                    return;
                  }
                  setStudentEmailInput("");
                  setStudentPasswordInput("");
                  setFlag.off();
                }}
                className={`grow py-2 ${!flag && `border-t-2 border-brand.2`} ${
                  flag && `bg-brand.5 cursor-pointer rounded`
                }`}
              >
                LogIn
              </div>
            </div>
            <form onSubmit={handleAuth} className="flex flex-col">
              {flag && (
                <>
                  <div className="text-teal-400 text-lg my-2">Student Name</div>
                  <div className="px-4 py-2 rounded bg-brand.5">
                    <Input
                      variant="unstyled"
                      placeholder="Enter Your Name"
                      textColor={"white"}
                      onChange={(e) => setStudentNameInput(e.target.value)}
                      value={studentNameInput}
                    />
                  </div>
                  <div className="text-teal-400 text-lg my-2">
                    Institute Name
                  </div>
                  <div className="px-4 py-2 rounded bg-brand.5">
                    <Input
                      variant="unstyled"
                      placeholder="Enter Your Institute Name"
                      textColor={"white"}
                      onChange={(e) => setInstituteNameInput(e.target.value)}
                      value={instituteNameInput}
                    />
                  </div>
                </>
              )}
              <div className="text-teal-400 text-lg my-2">Student Email</div>
              <div className="px-4 py-2 rounded bg-brand.5">
                <Input
                  type="email"
                  variant="unstyled"
                  placeholder="Enter Your Email"
                  textColor={"white"}
                  onChange={(e) => setStudentEmailInput(e.target.value)}
                  value={studentEmailInput}
                />
              </div>
              <div className="text-teal-400 text-lg my-2">Student Password</div>
              <div className="px-4 py-2 rounded bg-brand.5">
                <Input
                  type="password"
                  variant="unstyled"
                  placeholder="Enter Your Password"
                  textColor={"white"}
                  onChange={(e) => setStudentPasswordInput(e.target.value)}
                  value={studentPasswordInput}
                />
              </div>
              <div className="mt-4 mb-2 flex justify-center items-center">
                <Button
                  type="submit"
                  colorScheme="teal"
                  w={"50%"}
                  rightIcon={<MdLogin />}
                  fontSize={"large"}
                >
                  {flag ? <span>Register</span> : <span>LogIn</span>}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthForm;
