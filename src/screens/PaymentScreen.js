import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { convertToDolla } from "../utilities";
import { createOrderService } from "../services/OrderService";
import { resetProductSelect } from "../features/product/productSlice";
import { removeProductToWishList } from "../services/ProductService";
import { getDetailUser } from "../services/UserService";
import { updateUserRedux } from "../features/user/userSlice";
const PaymentScreen = () => {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { productSelect } = useSelector((state) => state.product);
  const navigation = useNavigation();
  const [newOrder, setNewOrder] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment",
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
    if(productSelect?.length === 0) {
      navigation.goBack()
    }
  }, [])

  const handleOrder = () => {
    const newData = {
      orderItems: productSelect,
      paymentMethod: "later_money",
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMemo,
      totalPrice: totalPriceMemo,
      fullName: data?.name,
      street: data?.address_street,
      district: data?.address_district,
      ward: data?.address_wards,
      city: data?.address_city,
      phone: data?.phone,
      user: data?._id,
    };
    const createOrder = async (data) => {
      const res = await createOrderService(data);
      setNewOrder(res?.data)
      return res.data;
    };
    const removeProductWishList = async (data) => {
      const res = await removeProductToWishList(data);
      return res.data;
    };
    const RefeshUser = async (id) => {
      const res = await getDetailUser(id);
      dispatch(updateUserRedux(res?.data))
      return res.data;
      
    }
    const arrayOrdered = [];
    productSelect.forEach((element) => {
      arrayOrdered.push(element.product);
    });

    const promises = arrayOrdered.map((id) =>
      removeProductWishList({
        prodId: id,
        _id: data?._id,
      })
    );

    Promise.all(promises)
      .then((result) => {
        const allSuccess = result.every((result) => {
          return result.status === "SUCCESS";
        });
        if (allSuccess) {
          RefeshUser(data?._id)
          // handleGetDetailsUser(user?.id, user?.access_token);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    createOrder(newData);
    
   
      navigation.navigate("OrderSuccess", {order: productSelect})
      dispatch(resetProductSelect());

  };
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
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 25,
            backgroundColor: "#fff",
          }}
        >
          <View>
            <Feather name="map-pin" size={30} color="#4dab96" />
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              gap: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                Delivery Address
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#595c71",
                }}
              >
                {data?.name} | 0{data?.phone}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#595c71",
                }}
              >
                {data?.address_street}, {data?.address_wards},{" "}
                {data?.address_district}, {data?.address_city}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
              }}
            >
              <Entypo name="chevron-thin-right" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 5,
            paddingVertical: 15,
          }}
        >
          {productSelect?.map((product) => (
            <View
              key={product?._id}
              style={{
                flexDirection: "row",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                }}
              >
                <Image
                  source={{ uri: product?.image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  gap: 10,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 20,
                  }}
                >
                  {product?.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      color: "#4dab96",
                    }}
                  >
                    {convertToDolla(product?.price)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#595c71",
                    }}
                  >
                    x{product?.amount}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginVertical: 20,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              Order Total ({productSelect?.length} items)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#4dab96",
              }}
            >
              {convertToDolla(priceMemo)}
            </Text>
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
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              Price Disscount
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#4dab96",
              }}
            >
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              Delivery Price
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#4dab96",
              }}
            >
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              Total Price
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#4dab96",
              }}
            >
              {convertToDolla(totalPriceMemo)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
          // paddingVertical: 20,

          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Total Price
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#4dab96",
                fontWeight: "700",
              }}
            >
              {convertToDolla(totalPriceMemo)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleOrder}
            style={{
              backgroundColor: "#4dab96",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
              }}
            >
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
