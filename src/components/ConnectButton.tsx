import { Button, Box, Text, Flex } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <Flex
      alignItems="center"
      bg="rgb(247, 248, 250)"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="black" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(0)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="white"
        border="0.06rem solid transparent"
        _hover={{
          border: "0.06rem",
          borderStyle: "solid",
          borderColor: "rgb(211,211,211)",
        }}
        borderRadius="xl"
        m="0.06rem"
        px={3}
        h="2.37rem"
      >
        <Text color="black" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Flex>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="rgb(253, 234, 241)"
      color="rgb(213, 0, 102)"
      fontSize="1rem"
      fontWeight="semibold"
      borderRadius="xl"
      border="0.06rem solid rgb(253, 234, 241)"
      _hover={{
        borderColor: "rgb(213, 0, 102)",
      }}
      _active={{
        borderColor: "rgb(213, 0, 102)",
      }}
    >
      Connect to a wallet
    </Button>
  );
}
