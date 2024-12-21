import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton, Surface, TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



type DestinationSelectorProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DestinationSelector'>;
  };

const DestinationSelector: React.FC<DestinationSelectorProps> = ({navigation}) => {
  const [destination, setDestination] = React.useState('');

  const destinations = [
    { id: 1, name: 'Gym', icon: '💪' },
    { id: 2, name: 'Travelling', icon: '🌴' },
    { id: 3, name: 'Office', icon: '💼' },
    { id: 4, name: "Maddy's Party", icon: '🎉' },
    { id: 5, name: 'Hometown', icon: '🏠' },
    { id: 6, name: 'Interview', icon: '👔' },
  ];

  return (
    <Surface style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>
          Remind me while leaving for..
        </Text>
        <IconButton
  icon={props => <MaterialCommunityIcons name="close" {...props} />}
  size={20}
    onPress={() => console.log('Pressed')}
  />
      </View>

      {/* Destinations Grid */}
      <ScrollView>
        <View style={styles.grid}>
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              style={styles.card}
              onPress={() => {/* Add selection handler */}}
            >
              <Card.Content style={styles.cardContent}>
                <Text style={styles.emoji}>{destination.icon}</Text>
                <Text variant="bodyMedium" style={styles.destinationText}>
                  {destination.name}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Divider with "or" text */}
        <View style={styles.dividerContainer}>
          <Text variant="bodySmall" style={styles.orText}>
            or
          </Text>
        </View>

        <TextInput
            mode="outlined"
            label="Add your destination"
            value={destination}
            onChangeText={setDestination}
            keyboardType="phone-pad"
            style={[styles.input, styles.addButton]}
            outlineStyle={styles.inputOutline}
          />

        {/* Add destination button */}
      </ScrollView>

      {/* Next button */}
      <Button
        mode="contained"
        onPress={() => {/* Add next handler */}}
        style={styles.nextButton}
        contentStyle={styles.nextButtonContent}
      >
        Next
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  destinationText: {
    color: '#666',
    textAlign: 'center',
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  orText: {
    color: '#999',
  },
  addButton: {
    marginBottom: 24,
  },
  nextButton: {
    backgroundColor: '#1B4332', // Dark green color
    marginTop: 'auto',
  },
  nextButtonContent: {
    paddingVertical: 6,
  },
  input: {
    backgroundColor: 'white',
  },
  inputOutline: {
    borderRadius: 8,
  },
});

export default DestinationSelector;