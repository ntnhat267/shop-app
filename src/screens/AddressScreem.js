import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getCity } from "../services/ProvincesService";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { updateUser } from "../services/UserService";
import { updateUserRedux } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const AddressScreem = () => {
  const {data} = useSelector(state => state.user)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [indexCity, setIndexCity] = useState(1);
  const [indexDistrict, setIndexDistrict] = useState(1);
  const [dataCity, setDataCity] = useState([]);
  const [isShowCity, setIsShowCity] = useState(true);
  const [isShowDisrict, setIsShowDisrict] = useState(false);
  const [isShowWard, setIsShowWard] = useState(false);
  const [isShowStreet, setIsShowStreet] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Change Phone",
      headerStyle: {
        height: 200,
      },
      headerTitleStyle: {
        color: "#4dab96",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4dab96" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={HandleUpdateAddress} disabled={!isConfirm}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: isConfirm ? "#4dab96" : "#9e9ea7",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  });
  useEffect(() => {
    const fetchCity = async () => {
      setIsLoading(true);
      const res = await getCity();
      setDataCity(res?.data);
      setIsLoading(false);
      return res;
    };
    fetchCity();
  }, []);
  const handleSelectCity = (index, city) => {
    setIsShowCity(false);
    setIndexCity(index);
    setCity(city);
    setIsShowDisrict(true);
  };

  const handleSelectDistrict = (index, district) => {
    setIsShowDisrict(false);
    setIndexDistrict(index);
    setDistrict(district);
    setIsShowWard(true);
  };
  const handleSelectWard = (ward) => {
    setIsShowWard(false);
    setWard(ward);
    setIsShowStreet(true);
  };

  const HandleUpdateAddress = async () => {
    const res = await updateUser(data?._id, {
      address_city: city,
      address_district: district,
      address_wards: ward,
      address_street: street,
    });
    if (res.data?.status === "SUCCESS") {
      dispatch(updateUserRedux(res.data));
      navigation.goBack();
    }
    return res;
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          gap: 10,
          // flexDirection: "row"
        }}
      >
        {city === "" && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#4dab96",
                padding: 3,
              }}
            >
              <View
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#4dab96",
                  flex: 1,
                }}
              ></View>
            </View>
            <Text>Select your city</Text>
          </View>
        )}
        {city !== "" && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: "100%",
                  backgroundColor: "#9e9ea7",
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              {city}
            </Text>
          </View>
        )}
        {city !== "" && district === "" && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#4dab96",
                padding: 3,
              }}
            >
              <View
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#4dab96",
                  flex: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Select your district
            </Text>
          </View>
        )}
        {district !== "" && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: "100%",
                  backgroundColor: "#9e9ea7",
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              {district}
            </Text>
          </View>
        )}
        {city !== "" && district !== "" && ward === "" && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#4dab96",
                padding: 3,
              }}
            >
              <View
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#4dab96",
                  flex: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Select your ward
            </Text>
          </View>
        )}
        {ward !== "" && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: "100%",
                  backgroundColor: "#9e9ea7",
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              {ward}
            </Text>
          </View>
        )}
        {city !== "" && district !== "" && ward !== "" && !isConfirm && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#4dab96",
                padding: 3,
              }}
            >
              <View
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#4dab96",
                  flex: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Select your street
            </Text>
          </View>
        )}
        {street !== "" && isConfirm && (
          <View
            style={{
              alignItems: "center",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: "100%",
                backgroundColor: "transparent",
                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: "100%",
                  backgroundColor: "#9e9ea7",
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              {street}
            </Text>
          </View>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View
          style={{
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
            flex: 1,
          }}
        >
          {isShowCity && (
            <ScrollView
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            >
              {dataCity?.map((city, index) => (
                <TouchableOpacity
                  key={city?.code}
                  onPress={() => handleSelectCity(index, city?.name)}
                  style={{
                    // marginVertical: 5,
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text>{city?.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {isShowDisrict && (
            <>
              <ScrollView
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              >
                {dataCity[indexCity]?.districts.map((district, index) => (
                  <TouchableOpacity
                    key={district?.codename}
                    onPress={() => handleSelectDistrict(index, district?.name)}
                    style={{
                      // marginVertical: 5,
                      paddingVertical: 20,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text>{district?.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
          {isShowWard && (
            <>
              <ScrollView
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              >
                {dataCity[indexCity]?.districts[indexDistrict]?.wards.map(
                  (ward, index) => (
                    <TouchableOpacity
                      key={ward?.codename}
                      onPress={() => handleSelectWard(ward?.name)}
                      style={{
                        // marginVertical: 5,
                        paddingVertical: 20,
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text>{ward?.name}</Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </>
          )}
          {isShowStreet && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "stretch",
                marginHorizontal: 10,
                marginVertical: 10,
                gap: 10,
              }}
            >
              <View
                style={{
                  height: 50,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  justifyContent: "center",

                  borderRadius: 10,

                  flex: 1,
                }}
              >
                <TextInput
                  placeholder="Enter your street"
                  value={street}
                  onChangeText={(text) => setStreet(text)}
                  style={{
                    fontSize: 20,
                    fontWeight: "400",
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (street !== "") {
                    setIsShowStreet(false);
                    setIsConfirm(true);
                  } else {
                  }
                }}
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={
                    {
                      // textAlign: '',
                    }
                  }
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default AddressScreem;
