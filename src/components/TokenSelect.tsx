import {Button, Box, Image, useDisclosure} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import etherLogo from "../assets/etherLogo.png";
type Props = {
  openTokenModal: any;
  value: any
};

export default function TokenSelect({ openTokenModal, value }: Props) {

  return (
    <Button
      bg="white"
      borderRadius="1.12rem"
      boxShadow="rgba(0, 0, 0, 0.075) 0px 6px 10px"
      fontWeight="500"
      mr="0.5rem"
      color="black"
      onClick={openTokenModal}
      _hover={{ bg: "rgb(30,144,255)" }}
      rightIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}>
      <Image boxSize="1.5rem"
             src={etherLogo}
             alt="Ether Logo"
             mr="0.5rem"
      />
      {value}
    </Button>
  );
}
