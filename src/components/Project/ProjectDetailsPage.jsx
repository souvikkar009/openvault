"use client";
import React from "react";
import ProjectDetails from "./ProjectDetails";
import { useDisclosure } from "@chakra-ui/react";

const ProjectDetailsPage = ({
  title,
  description,
  instituteName,
  domainName,
}) => {
  const { onClose } = useDisclosure();
  return (
    <div>
      <ProjectDetails
        isOpen={true}
        onClose={onClose}
        title={title}
        description={description}
        instituteName={instituteName}
        domainName={domainName}
      />
    </div>
  );
};

export default ProjectDetailsPage;
