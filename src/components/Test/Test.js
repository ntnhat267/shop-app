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
// import { getAllOrder } from "../services/OrderService";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
// import { convertToDolla, formatTimeToDate } from "../utilities";

const Test = ({ dataSelect }) => {
  <ScrollView
    style={{
      // marginVertical: 10,
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
  </ScrollView>;
};

export default Test;
