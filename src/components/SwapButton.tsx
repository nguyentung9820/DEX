import { Button, Box} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";


export default function SwapButton() {
  const { account } = useEthers();

  return account ? (
    <Box mt="0.5rem">
      <Button
        color="white"
        bg="rgb(255,140,0)"
        width="100%"
        p="1.62rem"
        borderRadius="1.25rem"
        _hover={{ bg: "rgb(255,165,0)" }}
      >
        Swap
      </Button>
    </Box>
  ) : (
    <Box mt="0.5rem">
      <Button
        color="white"
        bg="rgb(255,140,0)"
        width="100%"
        p="1.62rem"
        borderRadius="1.25rem"
        _hover={{ bg: "rgb(255,165,0)" }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
}
