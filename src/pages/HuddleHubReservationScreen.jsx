import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import HuddleHubHeader from '../components/HuddleHubHeader';
import HuddleHubComponent from '../components/HuddleHubComponent';
import BackgroundImage from '../assets/background.png';

const InputField = ({placeholder, value, onChangeText}) => (
  <TextInput
    style={styles.textInput}
    placeholderTextColor={COLORS.black}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);

export default function () {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    table: '',
    time: '',
    date: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleReservation = () => {
    navigation.navigate('DrawerNavigator', {
      screen: 'HuddleHubReservationSuccessScreen',
    });
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <HuddleHubHeader />

      <Text style={styles.title}>Резерв столика</Text>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        <InputField
          placeholder={'Имя...'}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />

        <InputField
          placeholder={'Номер телефона'}
          value={formData.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />

        <InputField
          placeholder={'Столик'}
          value={formData.table}
          onChangeText={text => handleInputChange('table', text)}
        />

        <InputField
          placeholder={'Время'}
          value={formData.time}
          onChangeText={text => handleInputChange('time', text)}
        />

        <InputField
          placeholder={'Дата'}
          value={formData.date}
          onChangeText={text => handleInputChange('date', text)}
        />

        <HuddleHubComponent
          text={'Зарезервировать'}
          style={styles.button}
          onPress={handleReservation}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    paddingVertical: 5,
    backgroundColor: COLORS.main,
  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    width: width * 0.9,
    alignSelf: 'center',
    paddingBottom: 100,
  },
  textInput: {
    height: 60,
    width: '100%',
    fontSize: 14,
    fontFamily: FONTS.bold,
    textAlign: 'left',
    color: COLORS.black,
    paddingLeft: 20,
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderRadius: 15,
    borderColor: COLORS.main,
    borderWidth: 2,
  },
  button: {
    marginTop: 50,
  },
});
