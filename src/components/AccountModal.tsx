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
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";
import Identicon from "./Identicon";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function AccountModal({ isOpen, onClose }: Props) {
  const { account, deactivate } = useEthers();

  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="white"
        border="0.06rem"
        borderStyle="solid"
        borderColor="gray.300"
        borderRadius="3xl"
      >
        <ModalHeader color="black" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="black"
          fontSize="sm"
          _hover={{
            color: "gray.600",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="0.06rem"
            borderStyle="solid"
            borderColor="gray.300"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="rgb(110, 114, 125);" fontSize="sm">
                Connected with MetaMask
              </Text>
              <Button
                variant="outline"
                size="sm"
                borderRadius="3xl"
                fontSize="0.81rem"
                fontWeight="normal"
                borderColor="rgb(236, 236, 236)"
                color="rgb(213, 0, 102)"
                px={2}
                h="1.62rem"
                _hover={{
                  background: "none",
                  borderColor: "rgb(213, 0, 102)",
                  textDecoration: "underline",
                }}
                onClick={handleDeactivateAccount}
              >
                Change
              </Button>
            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Identicon />
              <Text
                color="black"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={3}>
              <Button
                variant="link"
                color="rgb(110, 114, 125)"
                fontWeight="normal"
                fontSize="0.825rem"
                _hover={{
                  textDecoration: "none",
                  color: "rgb(110, 114, 125)",
                }}
              >
                <CopyIcon mr={1} />
                Copy Address
              </Button>
              <Link
                fontSize="0.825rem;"
                d="flex"
                alignItems="center"
                href={`https://ropsten.etherscan.io/address/${account}`}
                isExternal
                color="rgb(110, 114, 125)"
                ml={6}
                _hover={{
                  color: "rgb(110, 114, 125)",
                  textDecoration: "underline",
                }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </Link>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent="flex-start"
          background="rgb(237, 238, 242)"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}
        >
          <Text
            color="black"
            fontWeight="medium"
            fontSize="md"
          >
            Your transactions willl appear here...
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
