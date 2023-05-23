import { Text, SafeAreaView, View, StatusBar, ScrollView } from "react-native";
import Test from "../components/Test/Test";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import BestSaleComponent from "../components/BestSaleComponent/BestSaleComponent";
// import { ScrollView } from "native-base";
import RecommendForYou from "../components/RecommendForYouComponent/RecommendForYou";
import { useRef } from "react";
import DrawerCartComponent from "../components/DrawerCartComponent/DrawerCartComponent";
import Drawer from "react-native-drawer";
import SliderComponent from "../components/SliderComponent/SliderComponent";

const Home = () => {
  const drawerRef = useRef(null);
  const openDrawer = () => {
    drawerRef.current.open();
  };

  const closeDrawer = () => {
    drawerRef.current.close();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Drawer
        ref={drawerRef}
        content={<DrawerCartComponent />}
        openDrawerOffset={0.3}
        tapToClose={true}
      >
        <>
          <HeaderComponent openDrawer={openDrawer} />
          <ScrollView>
            <SliderComponent/>
            <BestSaleComponent />

            <RecommendForYou />
          </ScrollView>
        </>
      </Drawer>
    </SafeAreaView>
  );
};

export default Home;
