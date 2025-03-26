import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground, Image,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import HuddleHubHeader from '../components/HuddleHubHeader';
import BackgroundImage from '../assets/background.png';
import Glove from '../assets/icons8-boxing-glove-96.png';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.teamsContainer}>
        <Text style={styles.teams}>{teams}</Text>
      </View>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
        <Text style={styles.matchTime}>{time}</Text>
      </View>

      <Image source={Glove} style={styles.image}/>
    </View>
  );

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <HuddleHubHeader />

      <Text style={styles.title}>Трансляции</Text>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100, marginTop: 15}}>
        {renderBroadcast('WBA Title Fight', '02.04 22:00', 'Canelo Alvarez \n' + 'Jermall Charlo')}
        {renderBroadcast('IBF Title Fight', '05.04 23:30', 'Naoya Inoue \n' + 'Nonito Donaire')}
        {renderBroadcast('WBO Title Fight', '08.04 20:45', 'Tyson Fury \n' + 'Oleksandr Usyk')}
        {renderBroadcast('WBC Title Fight', '11.04 21:15', 'Gervonta Davis \n' + 'Ryan Garcia')}
        {renderBroadcast('Featherweight Bout', '14.04 18:30', 'Shakur Stevenson \n' + 'Oscar Valdez')}
        {renderBroadcast('Middleweight Clash', '17.04 22:00', 'Jermell Charlo \n' + 'Brian Castaño')}
        {renderBroadcast('Heavyweight Showdown', '20.04 20:45', 'Deontay Wilder \n' + 'Andy Ruiz Jr.')}
        {renderBroadcast('Super Lightweight', '23.04 19:30', 'Josh Taylor \n' + 'Teofimo Lopez')}
        {renderBroadcast('Welterweight Fight', '26.04 21:00', 'Errol Spence Jr. \n' + 'Terence Crawford')}
        {renderBroadcast('Super Bantamweight', '29.04 22:30', 'Brandon Figueroa \n' + 'Stephen Fulton')}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: COLORS.main,
    elevation: 5,
    paddingLeft: 20,
  },
  league: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.white,
    paddingVertical: 8,
  },
  leagueContainer: {
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamsContainer: {
    width: '100%',
    paddingBottom: 10,
  },
  matchTime: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    width: '40%',
    marginLeft: 15,
  },
  teams: {
    textAlign: 'left',
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.white,
    marginTop: 5,
    marginLeft: 5,
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
  image: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    alignSelf: 'center',
  }
});
