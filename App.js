import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Image } from 'react-native'; // Import Image component
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from './Chat';
import Login from './Login';

const { width } = Dimensions.get('window');

const images = {
  'Red Cross America': require('./images/RedCross.png'),
  // 'Jane Smith': require('./images/jane_smith.jpg'),
  // 'Peter Griffin': require('./images/peter_griffin.jpg'),
};

const profiles = [
  {
    id: 1,
    name: 'Red Cross America',
    profileImage: images['Red Cross America'],
    categories: ['Sports', 'Technology'],
    website: 'https://www.redcross.org/volunteer/become-a-volunteer.html#step1',
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
    name: 'Peter Griffin',
    categories: ['Medical', 'Education'],
    website: 'example.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Stack = createStackNavigator();

function ProfileScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const handleSwipe = (direction) => {
    const newIndex = direction === 'right' ? currentIndex - 1 : currentIndex + 1;

    // Stop swiping if accepted the last profile
    if (direction === 'right') {
      navigation.navigate('Chat');
    }

    // Continue swiping if rejected or accepted other profiles
    if (newIndex >= 0 && newIndex < profiles.length) {
      Animated.timing(position, {
        toValue: { x: direction === 'right' ? width : -width, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setCurrentIndex(newIndex);
        position.setValue({ x: 0, y: 0 });
      });
    } else {
      throw new Error('OutOfBoundsException');
    }
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
              {/* Image goes here */}
              <Image source={profile.profileImage} style={styles.profileImage} />
              <View style={styles.categoriesContainer}>
                {profile.categories.map((category, categoryIndex) => (
                  <View key={categoryIndex} style={styles.category}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </View>
                ))}
              </View>
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  category: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  categoryText: {
    color: '#fff',
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
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
});

export default App;
