import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text, Input,
} from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function TokenModal({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState<any>("");
  const [crypto, setCrypto] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>("");

  console.log(selected)

  useEffect(() => {
    Axios.get(
      `https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
    ).then((res) => {
      setCrypto(res.data.coins);
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent
        background="white"
        border="0.06rem"
        borderStyle="solid"
        borderColor="gray.300"
        borderRadius="3xl">
        <ModalHeader color="black" px={4} fontSize="lg" fontWeight="medium">
          Select A Token
        </ModalHeader>
        <ModalCloseButton
          color="black"
          fontSize="sm"
          _hover={{
            color: "gray.600",
          }}/>
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="0.06rem"
            borderStyle="solid"
            borderColor="gray.300"
            px={5}
            pt={4}
            pb={2}
            mb={3}>
            <Input
              placeholder="Search Token name"
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="left"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              color="black"/>
          </Box>
          <div id="customers" className="App">
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Symbol</td>
                </tr>
              </thead>
              <tbody>
                {crypto
                  .filter((val) => {
                    return val.name.toLowerCase().includes(search.toLowerCase());
                  })
                  .map((val) => {
                    return (
                      <>
                        <tr id={val.name} onClick={function () {
                          setSelected(val.name);
                        }}>
                          <td className="logo">
                              <a href={val.websiteUrl}>
                                <img src={val.icon} alt="logo" width="30px" />
                              </a>
                              <span>{val.name}</span>
                          </td>
                          <td className="symbol">{val.symbol}</td>
                        </tr>
                      </>
                    );
                  })
                  .slice(0, 10)
                }
              </tbody>
            </table>
          </div>

        </ModalBody>

        <ModalFooter
          justifyContent="flex-start"
          background="rgb(237, 238, 242)"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}>
          <Text
            color="black"
            fontWeight="medium"
            fontSize="md">
            Manage Token List
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
