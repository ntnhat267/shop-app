import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GetDetailsOrderById } from "../services/OrderService";
import { convertToDolla, formatTimeToDate, paymentMethod } from "../utilities";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const DetailOrderScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDetailOrderById = async () => {
      const res = await GetDetailsOrderById(orderId);
      setIsLoading(true);
      setData(res?.data?.data);
      setIsLoading(false);
      return res;
    };
    fetchDetailOrderById();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detail Order",
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
  return (
    <View
      style={{
        // marginVertical: 10,
        // marginHorizontal: 10,
        flex: 1,
        backgroundColor: "#dcdee0"
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <View
            style={{
              backgroundColor: "#4dab96",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 20,
              flex: 1,
              gap: 17,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  lineHeight: 28,
                  color: "#fff",
                }}
              >
                Order code
                <Text style={{ color: "#2b2d41" }}>
                  {" "}
                  #{data?._id?.slice(0, 6)}{" "}
                </Text>
                was placed on
                <Text style={{ color: "#2b2d41" }}>
                  {" "}
                  {formatTimeToDate(data?.createdAt)}{" "}
                </Text>
                and is currently
                <Text style={{ color: "#2b2d41", fontWeight: "700" }}>
                  {" "}
                  {data?.status}
                </Text>
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome5 name="shipping-fast" size={60} color="#fff" />
            </View>
          </View>
          <View style={{
            paddingVertical: 20, 
            paddingHorizontal: 10, 
            backgroundColor: "#fff", 
            marginVertical: 10
          }}>
            <View style={{
                flexDirection: "row", 
                alignItems: 'center', 
                gap: 10, 
                marginBottom: 10
            }}>
              <View>
                <MaterialIcons name="local-shipping" size={30} color="black" />
              </View>
              <Text style={{
                fontSize: 20
              }}>Shipping Information</Text>
            </View>
            <View style={{
                gap: 5
            }}>
                <Text style={styles.item}>Name: {data?.shippingAddress?.fullName}</Text>
                <Text style={[styles.item, {lineHeight: 25}]}>Address: {data?.shippingAddress?.street}, {data?.shippingAddress?.ward}, {data?.shippingAddress?.district}, {data?.shippingAddress?.city},</Text>
                <Text style={styles.item}>Phone: 0{data?.shippingAddress?.phone}</Text>
                <Text style={styles.item}>Payment Method: {paymentMethod(data?.paymentMethod)}</Text>

            </View>
          </View>


          <View
            style={{
              backgroundColor: "#fff",
              paddingVertical: 20, 
              paddingHorizontal: 10, 
              backgroundColor: "#fff", 
              marginVertical: 10
            }}
          >
            <View style={{
                 marginBottom: 10, 
                 justifyContent: "center"
            }}>
                <Text style={{
                    fontSize: 20
                }}>
                    Total Price
                    <Text style={{
                         fontSize:24,
                         color: "#4dab96",
                         fontWeight: "700"
                    }}> {convertToDolla(data?.totalPrice)}</Text>
                </Text>
            </View>
            <View
            style={{
              gap: 10,
            }}
          >
            {data?.orderItems?.map((item) => (
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
                    // numberOfLines={1}
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
          </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    item: {
        fontSize: 16, 
        color: "#595c71", 
        fontWeight: "400"
    }
})

export default DetailOrderScreen;
