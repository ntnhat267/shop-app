import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import { getAllProduct } from "../../services/ProductService";
import CardProductComponent from "../CardProductComponent/CardProductComponent";
import { useNavigation } from "@react-navigation/native";

const RecommendForYou = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductBestSale = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProduct({
          page: 1,
          limit: 6,
          sold: true,
          search: "thể",
        });
        setData(data.data.data);
        setIsLoading(false);
        return data;
      } catch (error) {
        alert(error);
      }
    };
    fetchProductBestSale();
  }, []);
  const handlePress = () => {
    navigation.navigate("Category");
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Recommend For You
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#4dab96",
            }}
          >
            See more
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperListCard}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item) => (
              <CardProductComponent key={item._id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 25,
    paddingBottom: 20,
  },
});
export default RecommendForYou;
