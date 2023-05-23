import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { convertToDolla } from "../utilities";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addProductSelect } from "../features/product/productSlice";
import { useMemo } from "react";
const MyCart = () => {
  const { accessToken, data } = useSelector((state) => state.user);
  const { productSelect } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Cart",
      headerTitleStyle: {
        color: "#4dab96",
      },
    });
  }, []);
  useEffect(() => {
    setOrders(data?.wishList);
  }, [data?.wishList]);

  const priceMemo = useMemo(() => {
    const result = productSelect?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [productSelect]);
  const priceDiscountMemo = useMemo(() => {
    const result = productSelect?.reduce((total, cur) => {
      return total + cur.discount * cur.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [productSelect]);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || productSelect?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);
  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);
  const handleBuyNow = () => {
    if (data?.address_city) {
      navigation.navigate("Payment");
    } else {
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {accessToken ? (
        <View style={{ flex: 1 }}>
          {orders?.length === 0 ? (
            <View>
              <Text>No Order</Text>
            </View>
          ) : (
            <ScrollView
              style={{ flex: 1, paddingVertical: 10, marginHorizontal: 10 }}
            >
              {orders?.map((order, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      width: "5%",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => dispatch(addProductSelect(order))}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 1,
                          borderColor: "#000",
                          borderRadius: 5,
                          marginRight: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: productSelect?.some(
                            (obj) => obj.product === order.product
                          )
                            ? "#4dab96"
                            : "#fff",
                        }}
                      >
                        {productSelect.some(
                          (obj) => obj.product === order.product
                        ) && <AntDesign name="check" size={18} color="white" />}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "30%",
                      height: 120,
                    }}
                  >
                    <Image
                      source={{ uri: order?.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "58%",
                      // marginHorizontal: 20,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "500",
                          // color: "#4dab96",
                        }}
                      >
                        {order?.name}
                      </Text>
                      <TouchableOpacity>
                        <Feather name="more-vertical" size={24} color="black" />
                      </TouchableOpacity>
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
                          fontSize: 25,
                          fontWeight: "500",
                          color: "#4dab96",
                        }}
                      >
                        {convertToDolla(order?.price)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                          color: "#9e9ea7",
                        }}
                      >
                        x {order?.amount}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}

          <View
            style={{
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              elevation: 9,
            }}
          >
            {/* <Text
              style={{
                fontSize: 20,
                marginVertical: 10,
                marginHorizontal: 5,
              }}
            >
              Payment
            </Text> */}
            <View
              style={{
                backgroundColor: "#dcdee0",
                gap: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>Price product</Text>
                <Text style={styles.price}>{convertToDolla(priceMemo)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>Price Discount</Text>
                <Text style={styles.price}>
                  {convertToDolla(priceDiscountMemo)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>Delivery Price</Text>
                <Text style={styles.price}>
                  {convertToDolla(diliveryPriceMemo)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.title}>Total Price</Text>
                <Text style={styles.price}>
                  {convertToDolla(totalPriceMemo)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#4dab96",
                paddingVertical: 12,
                marginVertical: 10,
                borderRadius: 10,
              }}
              onPress={handleBuyNow}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            You are not logged in
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10, 
              marginVertical: 20
            }}
          >
            <TouchableOpacity
               onPress={() => navigation.navigate("Login")}
              style={{
                backgroundColor: "#4dab96",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: "#fff"
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
         
            onPress={() => navigation.navigate("Signup")}
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: '#4dab96', 
                borderWidth: 1
                
              }}
            >
              <Text
               
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: '#4dab96'
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    color: "#4dab96",
  },
});

export default MyCart;
