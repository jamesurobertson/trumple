import Providers from "./components/Providers";
import Header from "./components/Header";
import Game from "./components/Game";
import Toast from "./components/Toast";
import HowToModal from "./components/Modals/HowToModal";
import StatsModal from "./components/Modals/StatsModal";

const App = () => (
  <Providers>
    <Header />
    <Game />
    <Toast />
    <HowToModal />
    <StatsModal />
  </Providers>
);

export default App;
