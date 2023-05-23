import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet
} from "react-native";
import { getProductById } from "../services/ProductService";
import SliderDetailProduct from "../components/SliderDetailProduct/SliderDetailProduct";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AboutDetailProduct from "../components/AboutDetailProduct/AboutDetailProduct";
import ReviewsDetailsProduct from "../components/ReviewsDetailsProduct/ReviewsDetailsProduct";
import { convertToDolla } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import { AddToWishListAction } from "../features/user/userAction";
import { setIsAddToWishListSuccess, updateUserRedux } from "../features/user/userSlice";
import { getDetailUser } from "../services/UserService";
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";

const renderScene = SceneMap({
  about: AboutDetailProduct,
  reviews: ReviewsDetailsProduct,
});

const DetailProductScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {accessToken, data: dataRedux, isAddToWishListSuccess} = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About Item" },
    { key: "reviews", title: "Reviews" },
  ]);
  const [data, setData] = useState();
  const { itemId } = route.params;
  const { width } = Dimensions.get("window");
  useLayoutEffect(() => {
    navigation.setOptions({
     
      headerStyle: {
        height: 200,
      },
      headerTitleStyle: {
          color: '#4dab96'
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#4dab96" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <>
        {accessToken && (

        <TouchableOpacity 
        onPress={() => navigation.navigate("Cart")}
        style={{
          position: "relative"
        }}>
          <AntDesign name="shoppingcart" size={35} color="black" />
          <View style={{
            backgroundColor: "#4dab96", 
            position: "absolute", 
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
            height: 20, 
            width: 20,
            right: -5,
            top: -7, 
            zIndex: 10
          }}>
            <Text>{dataRedux?.wishList?.length}</Text>
          </View>
        </TouchableOpacity>
        )}
        </>
      ),
    });
  });
  useEffect(() => {
    const fetchProductById = async () => {
      setIsLoading(true);
      try {
        const data = await getProductById(itemId);
        setData(data?.data?.data);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchProductById();
  }, []);

  useEffect(() => {
    if(isAddToWishListSuccess) {
      const refetchUser = async () => {
        const res =  await getDetailUser(dataRedux?._id);
        dispatch(updateUserRedux(res?.data))
        return res;
      }
      refetchUser()
      dispatch(setIsAddToWishListSuccess())
    }
  }, [isAddToWishListSuccess])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: true,
    });
  }, []);
  const handleAddToCart = () => {
    if(accessToken){
      console.log("hi");
      dispatch(AddToWishListAction({
        prodId: itemId,
        amount: 1, 
        _id: dataRedux?._id
      }))
      handleShowModal()
    } else{
      navigation.navigate("Login")
    }
  }
  const handleBuyNow = () => {
    if(accessToken){
     
    } else{
      navigation.navigate("Login")
    }
  }
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 15,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowColor: "#000",
            marginTop: 20
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              marginBottom: 15,
            }}
          >
            <SliderDetailProduct data={data?.image} />
            <Text
              style={{
                marginVertical: 15,
                fontSize: 30,
                fontWeight: "500",
                lineHeight: 40,
              }}
            >
              {data?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                width: width - 50,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <AntDesign name="star" size={20} color="#e4ad68" />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#9e9ea7",
                  }}
                >
                  {data?.totalrating}.6 Ratings
                </Text>
              </View>
              <Entypo name="dot-single" size={24} color="black" />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#9e9ea7",
                  }}
                >
                  {data?.ratings.length}0k+ Reviews
                </Text>
              </View>
              <Entypo name="dot-single" size={24} color="black" />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#9e9ea7",
                  }}
                >
                  {data?.sold}0k+ Sold
                </Text>
              </View>
            </View>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              style={{ marginTop: 10 }}
              onIndexChange={setIndex}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: "#4dab96" }}
                  style={{ backgroundColor: "white" }}
                  renderLabel={({ route, focused }) => (
                    <Text
                      style={{
                        color: focused ? "#4dab96" : "#9e9ea7",
                        fontSize: 20,
                        fontWeight: "500",
                      }}
                    >
                      {route.title}
                    </Text>
                  )}
                />
              )}
            />
            <View>
              {index === 0 ? (
                <AboutDetailProduct data={data} />
              ) : (
                <ReviewsDetailsProduct data={data?.ratings} />
              )}
            </View>
          </View>

          {/* <Text >hi</Text> */}
        </ScrollView>
      )}
      {!isLoading && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 18,
            // borderTopWidth: 1,
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
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "#c2c3c7",
                // marginBottom: 3,
              }}
            >
              Total Price
            </Text>
            <Text
              style={{
                fontSize: 35,
                fontWeight: 500,
                color: "#4dab96",
              }}
            >
              {convertToDolla(data?.price)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "stretch",
              paddingHorizontal: 10,

            }}
          >
            <TouchableOpacity
            onPress={handleAddToCart}
              style={{
                backgroundColor: "#4dab96",
                padding: 15,
                paddingHorizontal: 20,
              }}
            >
              <FontAwesome name="shopping-bag" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleBuyNow}
              style={{
                justifyContent: "center",
                backgroundColor: "#2b2d41",
                paddingHorizontal: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#fff",
                }}
              >
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
        <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Octicons name="check-circle" size={40} color="#fff" />
            <Text style={styles.modalText}>Đã thêm vào giỏ hàng</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#00000082',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: "white"
  },
});

export default DetailProductScreen;
