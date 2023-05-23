import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { GetDetailsOrderById } from "../services/OrderService";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import { convertToDolla } from "../utilities";
import { setIndexSelect } from "../features/product/productSlice";
const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    if (!order) {
      navigation.navigate("Cart");
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Order Sucess",
      headerStyle: {
        height: 200,
      },
      headerTitleStyle: {
        color: "#4dab96",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="chevron-back" size={30} color="#4dab96" />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#4dab96",
          marginHorizontal: 20,
          marginVertical: 10,
          paddingHorizontal: 20,
          paddingVertical: 30,
          gap: 10,
        }}
      >
        <AntDesign name="checkcircleo" size={50} color="#fff" />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            color: "#fff",
          }}
        >
          Your Order is Success
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: "#212529",
          }}
        >
          Thank you, {data?.name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: "#212529",
          }}
        >
          Your order is processing. Check your order for updated order
          information
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          gap: 10,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={{
            borderWidth: 1,
            borderColor: "#212529",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#212529",
            }}
          >
            Back Your Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setIndexSelect(0));
            navigation.navigate("Order");
          }}
          style={{
            borderWidth: 1,
            borderColor: "#212529",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#212529",
            }}
          >
            View Your Order
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          flex: 1,
        }}
      >
        <ScrollView>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 25,
              }}
            >
              Total Item: {order?.length}
            </Text>
          </View>
          {order?.map((item) => (
            <View
              key={item?.product}
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                }}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  gap: 8,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 20,
                    fontWeight: "400",
                  }}
                >
                  {item?.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // marginHorizontal: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      color: "#4dab96",
                    }}
                  >
                    {convertToDolla(item?.price)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                    }}
                  >
                    x{item?.amount}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;
