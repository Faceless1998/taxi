import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_PRICE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute p-3 rounded-full top-3 left-5 z-50`}
        >
          <Icon name="chevron-left" type="font-awesome" size={14} />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-5`}>
          Select a Ride — {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      {/* FlatList with all ride options */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={tw`bg-gray-200 h-px`} />}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={[
              tw`flex-row justify-between items-center px-10 py-2`,
              id === selected?.id && tw`bg-gray-200`,
            ]}
            onPress={() => setSelected(selected?.id === id ? null : item)}
          >
            <Image
              style={tw`w-24 h-24`}
              source={{ uri: image }}
              resizeMode="contain"
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-ge", {
                style: "currency",
                currency: "GEL",
              }).format(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_PRICE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View style={tw`border-t border-gray-200`}>
            <TouchableOpacity
              disabled={!selected}
              style={[
                tw`py-3 m-3 rounded`,
                selected ? tw`bg-black` : tw`bg-gray-300`,
              ]}
            >
              <Text style={tw`text-center text-white text-xl`}>
                Choose {selected?.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default RideOptionsCard;
