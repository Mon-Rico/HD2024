import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const profiles = [
  {
    id: 1,
    name: 'John Doe',
    categories: ['Sports', 'Technology'],
    website: 'example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    categories: ['Art', 'Music'],
    website: 'example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Robin Williams',
    categories: ['Medical', 'Education'],
    website: 'example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 4,
    name: 'Robin Williams',
    categories: ['Medical', 'Education'],
    website: 'example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 5,
    name: 'Robin Williams',
    categories: ['Medical', 'Education'],
    website: 'example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  // Add more profiles as needed
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();

  const handleSwipe = (direction) => {
    const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
    Animated.timing(position, {
      toValue: { x: direction === 'right' ? width : -width, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(newIndex);
      position.setValue({ x: 0, y: 0 });
    });
  };

  return (
    <View style={styles.container}>
      {profiles.map((profile, index) => {
        if (index < currentIndex) {
          return null;
        } else if (index === currentIndex) {
          return (
            <Animated.View key={profile.id} style={[styles.card, position.getLayout()]}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.description}>{profile.description}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleSwipe('left')}>
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleSwipe('right')}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        } else {
          return null;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  card: {
    width: width - 40,
    maxWidth: 300,
    height: 400,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'center', //center the card
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#eeeee4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#21130d',
    fontWeight: 'bold',
  },
});
