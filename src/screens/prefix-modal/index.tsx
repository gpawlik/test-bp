import * as React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  CloseIcon,
  Item,
  Prefix,
  Country,
  InputBox,
  Input,
} from "./styles";
import { data, CountryData } from "./constants";

interface Props {
  route: {
    params: {
      onPress: (arg0: { prefix: string; mask?: string }) => void;
      value?: string;
    };
  };
}

export const PrefixModal = React.memo<Props>(
  ({
    route: {
      params: { onPress, value },
    },
  }) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const navigation = useNavigation();

    const handleOnPress = React.useCallback(
      (item: CountryData) => {
        onPress({ prefix: item.prefix, mask: item.mask });
        navigation.goBack();
      },
      [navigation]
    );

    const handleClose = React.useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const filteredData = React.useMemo(() => {
      return data.filter((country: CountryData) =>
        country.name.includes(searchTerm)
      );
    }, [data, searchTerm]);

    const renderItem = ({ item }: { item: CountryData }) => (
      <Item onPress={() => handleOnPress(item)}>
        <Prefix>{item.prefix}</Prefix>
        <Country>{item.name}</Country>
      </Item>
    );

    return (
      <Container>
        <CloseIcon onPress={handleClose} />
        <InputBox>
          <Input value={searchTerm} onChangeText={setSearchTerm} />
        </InputBox>
        <FlatList data={filteredData} renderItem={renderItem} />
      </Container>
    );
  }
);
