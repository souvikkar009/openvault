"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const router = useRouter();

  const handleSearchQuery = (e) => {
    e.preventDefault();
    if (!query) {
      alert("Enter something to search");
      return;
    }
    if (!searchFilter) {
      alert("Enter search filter");
      return;
    }
    const params = new URLSearchParams({ q: query, filter: searchFilter });

    router.replace(`/search?${params.toString()}`);
  };

  return (
    <>
      <Modal
        onClose={() => {
          setQuery("");
          onClose();
        }}
        isOpen={isOpen}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent bg={"brand.1"}>
          <ModalBody>
            <form
              className="flex flex-col justify-center"
              onSubmit={(e) => {
                handleSearchQuery(e);
                onClose();
                setQuery("");
              }}
            >
              <div className="flex items-center">
                <IoSearchSharp className="text-brand.4 text-xl" />
                <Input
                  placeholder="Search Project"
                  size={"lg"}
                  color={"brand.3"}
                  variant={"unstyle"}
                  bg={"brand.1"}
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
              </div>

              <div className="flex flex-col items-center my-8">
                <RadioGroup
                  colorScheme={"teal"}
                  onChange={setSearchFilter}
                  value={searchFilter}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="institute">
                      <span className="bg-brand.5 text-gray-300 py-1 px-2 rounded">
                        Institute
                      </span>
                    </Radio>
                    <Radio value="domain">
                      <span className=" bg-brand.5 text-gray-300 py-1 px-2 rounded">
                        Domain
                      </span>
                    </Radio>
                    <Radio value="key word">
                      <span className=" bg-brand.5 text-gray-300 py-1 px-2 rounded">
                        Key Word
                      </span>
                    </Radio>
                    <Radio value="user">
                      <span className=" bg-brand.5 text-gray-300 py-1 px-2 rounded">
                        User
                      </span>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
