import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "../utilities";
import { logutUser } from "../features/user/userSlice";
import { setIndexSelect } from "../features/product/productSlice";
const Account = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { accessToken, data } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const { width } = Dimensions.get("screen");

  const ToggleInformation = () => {
    if (accessToken) {
      navigation.navigate("Information");
    } else {
      navigation.navigate("Login");
    }
  };

  const ToggleAddress = () => {
    if (accessToken) {
      navigation.navigate("Address");
    } else {
      navigation.navigate("Login");
    }
  };

  const ToggleMyOrder = () => {
    if (accessToken) {
      dispatch(setIndexSelect(2));
      navigation.navigate("Order");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <StatusBar style="dark-content" />
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            backgroundColor: "#4dab96",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: "100%",
            }}
          >
            <Image
              source={{
                uri:
                  data?.avatar ||
                  "https://ik.imagekit.io/gmltgojm2/4/avatar.png?updatedAt=1679846199635",
              }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
          {accessToken ? (
            <View>
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                {capitalizeFirstLetter(data?.name)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "300",
                  color: "#f7f7f7",
                }}
              >
                {" "}
                {data?.email}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderColor: "#fff", 
                  borderRadius: 10
                }}
              >
                <Text style={{
                  fontSize: 18, 
                  color: "#fff"
                }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
              style={{
                  borderWidth: 1,
                  paddingHorizontal: 18,
                  paddingVertical: 5,
                  borderRadius: 10, 
                  backgroundColor: "#f1f1f1", 
                  borderColor: "#fff",
                }}>
                <Text  style={{
                  fontSize: 20, 
                  color: "#4dab96",
                }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginTop: 10,
            gap: 20,
            backgroundColor: "#dcdee0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={ToggleInformation}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <View
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="information-circle" size={30} color="#595c71" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: "#595c71",
                }}
              >
                Change Information
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ToggleInformation}>
              <Entypo name="chevron-thin-right" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={ToggleAddress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <View
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="map-marker" size={30} color="#595c71" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: "#595c71",
                }}
              >
                Change Address
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ToggleAddress}>
              <Entypo name="chevron-thin-right" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={ToggleMyOrder}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
              }}
            >
              <View
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="receipt" size={30} color="#595c71" />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: "#595c71",
                }}
              >
                My order
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ToggleMyOrder}>
              <Entypo name="chevron-thin-right" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if(accessToken){
                  dispatch(setIndexSelect(0));
                  navigation.navigate("Order");
                } else {
                  navigation.navigate("Login");
                }
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: 10,
                  width: width / 4 - 10,
                }}
              >
                <Entypo name="progress-two" size={30} color="black" />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    fontWeight: "300",
                  }}
                >
                  Processing
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(accessToken){
                dispatch(setIndexSelect(1));
                navigation.navigate("Order");
                } else {
                  navigation.navigate("Login");
                }
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: 10,
                  width: width / 4,
                }}
              >
                <MaterialIcons name="local-shipping" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "300",
                  }}
                >
                  Dispatched
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(accessToken){
                dispatch(setIndexSelect(2));
                navigation.navigate("Order");
                }else {
                  navigation.navigate("Login");
                }
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: 10,
                  width: width / 4,
                }}
              >
                <Entypo name="dropbox" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "300",
                  }}
                >
                  Delivered
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(accessToken){
                dispatch(setIndexSelect(3));
                navigation.navigate("Order");
                } else {
                  navigation.navigate("Login");
                }
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: 10,
                  width: width / 4,
                }}
              >
                <MaterialIcons name="cancel" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "300",
                  }}
                >
                  Cancelled
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(logutUser());
          }}
          style={{
            backgroundColor: "#ee756f",
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 20,
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "400",
              color: "#fff",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Account;
