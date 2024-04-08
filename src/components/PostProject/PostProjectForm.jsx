"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { GoHome } from "react-icons/go";
import { MdOutlineCloudUpload } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";

const getDomain = async (name) => {
  name = name.toLowerCase().replaceAll(" ", "+");
  const result = await fetch(`http://localhost:3000/api/domains/${name}`, {
    cache: "no-store",
  });
  if (!result.ok) {
    console.log("Failed to store data!!!");
  }
  return result.json();
};

const getInstitute = async (name) => {
  name = name.toLowerCase().replaceAll(" ", "+");
  const result = await fetch(`http://localhost:3000/api/institutes/${name}`, {
    cache: "no-store",
  });
  if (!result.ok) {
    console.log("Failed to get data!!!");
  }
  return result.json();
};
const PostProjectForm = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instituteInput, setInstituteInput] = useState("");
  const [domainInput, setDomainInput] = useState("");

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !instituteInput || !domainInput) {
      alert("All field requires");
      return;
    }

    const domainResult = await getDomain(domainInput);
    const instituteResult = await getInstitute(instituteInput);
    const { isDomainExists, domainId, domainName } = domainResult;
    const { isInstituteExists, instituteId, instituteName } = instituteResult;

    if (!isInstituteExists) {
      alert("Institute Not Exists");
      return;
    }

    if (!isDomainExists) {
      alert("Domain Not Exists");
      return;
    }

    await axios
      .post("http://localhost:3000/api/projects", {
        title,
        description,
        instituteName: instituteName,
        instituteId: instituteId,
        domainName: domainName,
        domainId: domainId,
      })
      .then((res) => {
        alert(res.data.message);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent bg={"brand.1"}>
          <ModalBody
            css={{
              "&::-webkit-scrollbar": {
                width: 0,
              },
            }}
          >
            <div className="text-gray-50 flex items-center justify-end mr-4 mt-4 text-3xl">
              <GoHome onClick={onClose} className="cursor-pointer" />
            </div>
            <form onSubmit={handleProjectSubmit} className="flex flex-col">
              <div className="text-teal-400 text-lg my-2">Institute Name</div>
              <div className="px-4 py-2 rounded bg-brand.5">
                <Input
                  variant="unstyled"
                  placeholder="Write Institute Name Here"
                  textColor={"white"}
                  onChange={(e) => setInstituteInput(e.target.value)}
                  value={instituteInput}
                />
              </div>
              <div className="text-teal-400 text-lg my-2">Domain Name</div>
              <div className="px-4 py-2 rounded bg-brand.5">
                <Input
                  variant="unstyled"
                  placeholder="Write Domain Here"
                  textColor={"white"}
                  onChange={(e) => setDomainInput(e.target.value)}
                  value={domainInput}
                />
              </div>
              <div className="text-teal-400 text-lg my-2">Project Title</div>
              <div className="px-4 py-2 rounded bg-brand.5">
                <Input
                  variant="unstyled"
                  placeholder="Write Project Title Here"
                  textColor={"white"}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="text-teal-400 text-lg my-2">
                Project Description
              </div>
              <textarea
                className="focus:outline-none text-base px-4 py-2 rounded-lg resize-none bg-brand.5 text-white"
                placeholder="Write Project Description Here"
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>

              <div className="mt-4 mb-2 flex justify-center items-center">
                <Button
                  type="submit"
                  colorScheme="teal"
                  w={"50%"}
                  rightIcon={<MdOutlineCloudUpload />}
                  fontSize={"large"}
                >
                  Upload
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostProjectForm;
