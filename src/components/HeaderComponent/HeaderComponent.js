import { Text, TouchableOpacity, View } from "react-native";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Drawer from "react-native-drawer";
import { useRef } from "react";
import DrawerCartComponent from "../DrawerCartComponent/DrawerCartComponent";
const HeaderComponent = ({ openDrawer }) => {

  const { accessToken, data } = useSelector((state) => state.user);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
        backgroundColor: "#fff",
       
      }}
    >
      <SearchComponent />
      {accessToken ? (
        <TouchableOpacity
          onPress={openDrawer}
          style={{
            position: "relative",
          }}
        >
          <AntDesign name="shoppingcart" size={35} color="black" />
          <View
            style={{
              backgroundColor: "#4dab96",
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              height: 20,
              width: 20,
              right: -5,
              top: -7,
              zIndex: 10,
            }}
          >
            <Text>{data?.wishList?.length}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            backgroundColor: "#4dab96",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      )}
    </View>
  
  );
};

export default HeaderComponent;
