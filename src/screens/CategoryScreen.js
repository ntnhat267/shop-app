// import { Text } from "react-native";
import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { getAllCategory } from "../services/CategoryService";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import CategoryComponent from "../components/CategoryComponent/CategoryComponent";
import { Slider } from "@miblanchard/react-native-slider";
import { Ionicons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { convertToDolla } from "../utilities";
import Drawer from "react-native-drawer";
import { useRef } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import DrawerCartComponent from "../components/DrawerCartComponent/DrawerCartComponent";
import { useDispatch } from "react-redux";
import { resetSearchName } from "../features/product/productSlice";
const Category = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState();
  const [isShowCategory, setIsShowCategory] = useState(false);
  const [isShowPrice, setIsShowPrice] = useState(false);
  const [isShowRate, setIsShowRate] = useState(false);
  const [isShowGender, setIsShowGender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [genderChecked, setGenderChecked] = useState([]);
  const [rateChecked, setRateChecked] = useState([]);
  const [price, setPrice] = useState([0, 2000000]);
  useEffect(() => {
    const fetchAllCategory = async () => {
      const res = await getAllCategory();
      setCategories(res?.data?.data);
      return res;
    };

    fetchAllCategory();
  }, []);
  const handleCategoryChange = (categoryId) => {
    const isChecked = categoryChecked.includes(categoryId);
    if (isChecked) {
      const updatedCategories = categoryChecked.filter(
        (id) => id !== categoryId
      );
      setCategoryChecked(updatedCategories);
    } else {
      setCategoryChecked([...categoryChecked, categoryId]);
    }
    setCurrentPage(1);
  };
  const handleChangeGender = (value) => {
    const isChecked = genderChecked.includes(value);
    if (isChecked) {
      const updatedGender = genderChecked.filter((id) => id !== value);
      setGenderChecked(updatedGender);
    } else {
      setGenderChecked([...genderChecked, value]);
    }
    setCurrentPage(1);
  };
  const handleChangeRate = (value) => {
    const isChecked = rateChecked.includes(value);
    if (isChecked) {
      const updatedRate = rateChecked.filter((id) => id !== value);
      setRateChecked(updatedRate);
    } else {
      setRateChecked([...rateChecked, value]);
    }
    setCurrentPage(1);
  };
  const handleResetFilter = () => {
    setCategoryChecked([])
    setGenderChecked([])
    setRateChecked([])
    setPrice([0, 2000000])
    setCurrentPage(1)
    dispatch(resetSearchName())
  }
  const drawerRef = useRef(null);
  const openDrawer = () => {
    drawerRef.current.open();
  };

  const closeDrawer = () => {
    drawerRef.current.close();
  };
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Drawer
          ref={drawerRef}
          content={<DrawerCartComponent />}
          openDrawerOffset={0.3}
          tapToClose={true}
        >
          <HeaderComponent openDrawer={openDrawer} />
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsShowCategory(!isShowCategory);
                    setIsShowPrice(false);
                    setIsShowRate(false);
                    setIsShowGender(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    backgroundColor: "#cfcfcf",
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="filter" size={18} color="black" />
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Filter Category
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowCategory(false);
                    setIsShowPrice(!isShowPrice);
                    setIsShowRate(false);
                    setIsShowGender(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    backgroundColor: "#cfcfcf",
                    borderRadius: 10,
                  }}
                >
                  <MaterialIcons name="attach-money" size={18} color="black" />
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Price
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowPrice(false);
                    setIsShowCategory(false);
                    setIsShowRate(!isShowRate);
                    setIsShowGender(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    backgroundColor: "#cfcfcf",
                    borderRadius: 10,
                  }}
                >
                  <MaterialIcons name="star-rate" size={18} color="black" />
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Rate
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowPrice(false);
                    setIsShowCategory(false);
                    setIsShowRate(false);
                    setIsShowGender(!isShowGender);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    backgroundColor: "#cfcfcf",
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="transgender-sharp" size={18} color="black" />
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Gender
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleResetFilter}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                    backgroundColor: "#cfcfcf",
                    borderRadius: 10,
                  }}
                >
                  <MaterialIcons name="cancel" size={18} color="black" />
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Reset Filter
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            {isShowCategory && (
              <View
                style={{
                  gap: 5,
                }}
              >
                {categories?.map((category) => (
                  <TouchableOpacity
                    key={category._id}
                    onPress={() => handleCategoryChange(category._id)}
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
                        backgroundColor: categoryChecked.includes(category._id)
                          ? "#4dab96"
                          : "#fff",
                      }}
                    >
                      {categoryChecked.includes(category._id) && (
                        <AntDesign name="check" size={18} color="white" />
                      )}
                    </View>
                    <Text>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {isShowPrice && (
              <View>
                <Text>
                  Giá: từ {convertToDolla(price[0])} đến{" "}
                  {convertToDolla(price[1])}
                </Text>
                <Slider
                  value={price}
                  maximumTrackTintColor="#d3d3d3"
                  maximumValue={2000000}
                  minimumTrackTintColor="#1fb28a"
                  minimumValue={0}
                  step={2}
                  thumbTintColor="#1a9274"
                  onValueChange={(value) => {
                    setCurrentPage(1);
                    setPrice(value);
                  }}
                />
              </View>
            )}
            {isShowRate && (
              <View style={{ gap: 8 }}>
                <TouchableOpacity
                  onPress={() => handleChangeRate("1")}
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                      backgroundColor: rateChecked.includes("1")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {rateChecked.includes("1") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={20} color="#e4ad68" />
                  </View>
                  <Text>1 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeRate("2")}
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                      backgroundColor: rateChecked.includes("2")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {rateChecked.includes("2") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                  </View>
                  <Text>2 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeRate("3")}
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                      backgroundColor: rateChecked.includes("3")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {rateChecked.includes("3") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                  </View>
                  <Text>3 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeRate("4")}
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                      backgroundColor: rateChecked.includes("4")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {rateChecked.includes("4") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                  </View>
                  <Text>4 sao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeRate("5")}
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                      backgroundColor: rateChecked.includes("5")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {rateChecked.includes("5") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                    <AntDesign name="star" size={20} color="#e4ad68" />
                  </View>
                  <Text>5 sao</Text>
                </TouchableOpacity>
              </View>
            )}
            {isShowGender && (
              <View
                style={{
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleChangeGender("male")}
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
                      backgroundColor: genderChecked.includes("male")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {genderChecked.includes("male") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <Text>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeGender("female")}
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
                      backgroundColor: genderChecked.includes("female")
                        ? "#4dab96"
                        : "#fff",
                    }}
                  >
                    {genderChecked.includes("female") && (
                      <AntDesign name="check" size={18} color="white" />
                    )}
                  </View>
                  <Text>Nữ</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ScrollView>
            <CategoryComponent
              category={categoryChecked}
              price={price}
              rate={rateChecked}
              gender={genderChecked}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </ScrollView>
        </Drawer>
      </SafeAreaView>
    </>
  );
};

export default Category;
