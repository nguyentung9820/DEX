import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./components/Header";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/Modal/AccountModal";
import Swap from "./components/Swap";
import "@fontsource/inter";
import "./global.css";
import Test from './components/Api/Test';

function App() {
  const  { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Header>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Header>
      <Swap />
      <Test/>
    </ChakraProvider>
  );
}

export default App;
