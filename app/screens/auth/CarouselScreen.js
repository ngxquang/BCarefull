import {Button} from '@rneui/themed';
import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

function CarouselScreen() {
    const flatListRef = useRef();
  const itemWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      id: '01',
      image: require('../../../assets/images/Carousel1.png'),
    },
    {
      id: '02',
      image: require('../../../assets/images/Carousel2.png'),
    },
    {
      id: '03',
      image: require('../../../assets/images/Carousel3.png'),
    },
  ];

  // auto scroll
  useEffect(() => {
    setInterval(() => {
        if(activeIndex === carouselData.length-1) {
            flatListRef.current.scollToIndex({
                index: 0,
                animation: true,
            });
        }
        else {
            flatListRef.current.scollToIndex({
                index: activeIndex + 1,
                animation: true,
            });
        }
    }, 2000)
  })

  const getItemLayout = (data, index) => {
    length: itemWidth,
    offset: itemWidth * index,
    index: index, 
  }

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Image source={item.image} style={{height: 200, width: itemWidth}} />
      </View>
    );
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    console.log({scrollPosition});

    const index = scrollPosition / itemWidth;
    console.log({index});
    setActiveIndex(index);
  };

  const renderDot = () => {
    return carouselData.map((dot, index) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'green',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 2,
            }}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'red',
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 2,
            }}
          />
        );
      }
    });
  };

  return (
    <View>
      <Text>CarouselScreen</Text>
      <FlatList
        keyExtractor={item => item.id}
        ref={flatListRef}
        data={carouselData}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 8}}>
        {renderDot()}
      </View>
    </View>
  );
}

export default CarouselScreen;
