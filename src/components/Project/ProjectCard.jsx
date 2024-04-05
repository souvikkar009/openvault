"use client";

import { Card, CardBody } from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineSchool } from "react-icons/md";

const ProjectCard = ({ title, domainName, instituteName, id }) => {
  return (
    <>
      <div className="w-1/2">
        <Card borderWidth={1} bg={"transparent"} borderColor={"brand.4"}>
          <CardBody>
            <div className="font-semibold">
              <Link href={`projects/${id}`}>
                <div className="text-teal-400 mt-2 hover:underline cursor-pointer">
                  {title}
                </div>
              </Link>

              <div className="flex items-center gap-2 mt-2">
                <MdOutlineSchool className="text-brand.4" />
                <span className="text-brand.4">{instituteName}</span>
              </div>
              <div className="text-teal-400 bg-brand.5 w-fit px-2 py-1 text-xs rounded-md cursor-pointer mt-2">
                {domainName}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ProjectCard;
