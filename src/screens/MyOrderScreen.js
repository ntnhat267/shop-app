import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrder } from "../services/OrderService";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { convertToDolla, formatTimeToDate } from "../utilities";

const MyOrderScreen = () => {
  const { indexSelect } = useSelector((state) => state.product);
  const { data } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [dataOrder, setDataOrder] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [index, setIndex] = useState(4);
  const [routes] = useState([
    { key: "processing", title: "Processing" },
    { key: "dispatched", title: "Dispatched" },
    { key: "delivered", title: "Delivered" },
    { key: "cancelled", title: "Cancelled" },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Order",
      headerStyle: {
        height: 200,
      },
      headerTitleStyle: {
        color: "#4dab96",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#4dab96" />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    const fetchAllOrder = async () => {
      setIsloading(true);
      const res = await getAllOrder(data?._id);
      setDataOrder(res?.data?.data);
      setIsloading(false);
      setIndex(indexSelect);
      return res;
    };
    fetchAllOrder();
  }, []);

  useEffect(() => {
    if (index === 0) {
      const newDataOrder = dataOrder.filter(
        (order) => order.status === "Processing"
      );
      setDataSelect(newDataOrder);
    } else if (index === 1) {
      const newDataOrder = dataOrder.filter(
        (order) => order.status === "Dispatched"
      );
      setDataSelect(newDataOrder);
    } else if (index === 2) {
      const newDataOrder = dataOrder.filter(
        (order) => order.status === "Delivered"
      );
      setDataSelect(newDataOrder);
    } else if (index === 3) {
      const newDataOrder = dataOrder.filter(
        (order) => order.status === "Cancelled"
      );
      setDataSelect(newDataOrder);
    }
  }, [index, indexSelect]);
  const renderRoute = () => (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      {dataSelect?.map((order, index) => (
        <View
          key={index}
          style={{
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            marginVertical: 10,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="person-circle-sharp" size={24} color="black" />
              <Text> {order?.shippingAddress?.fullName}</Text>
            </View>
            <TouchableOpacity
            onPress={() => navigation.navigate("DetailOrder", {orderId: order._id})}
              style={{
                backgroundColor: "#4dab96",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                View Detail
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              gap: 5,
            }}
          >
            {order?.orderItems?.map((item) => (
              <View
                key={item?.product}
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
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
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
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
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: "400",
              }}
            >
              {order?.orderItems?.length} Products
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Tota Price:
              <Text
                style={{
                  fontSize: 23,
                  color: "#4dab96",
                  fontWeight: "500",
                }}
              >
                {" "}
                {convertToDolla(order?.totalPrice)}
              </Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#9e9ea7",
              }}
            >
              Id: #{order?._id}{" "}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: "#4dab96" }}
      style={{ backgroundColor: "#fff" }}
      tabStyle={{ width: 150 }}
      labelStyle={{
        color: "black",
        fontWeight: "500",
      }}
    />
  );

  const renderScene = SceneMap({
    processing: renderRoute,
    dispatched: renderRoute,
    delivered: renderRoute,
    cancelled: renderRoute,
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
        />
      )}
    </View>
  );
};

export default MyOrderScreen;
