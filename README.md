# react-native-animated-icons
A collection of beautifully animated React Native icons inspired by popular social media platforms. Each animation is optimized for performance and designed to create engaging user interactions.

## Demo

![Demo](showcase.gif)


## Installation

```bash
npm install react-native-animated-icons react-native-svg
# or
yarn add react-native-animated-icons react-native-svg
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | number | 30 | Size of the heart icon |
| liked | boolean | false | Current liked state |
| onLikeChange | function | - | Callback when like state changes |
| baseColor | string | '#000' | Color of the outline heart |
| activeColor | string | '#ff3366' | Final color of the filled heart |
| gradientStartColor | string | '#9b4dca' | Start gradient color (purple) |
| gradientEndColor | string | '#ff6b8b' | Middle gradient color (pink) |

## Usage

```jsx

import React, { useState } from 'react';
import { View } from 'react-native';
import { AnimatedHeart } from 'react-native-animated-icons';

const MyComponent = () => {
  const [liked, setLiked] = useState(false);
  
  return (
    <View>
      <AnimatedHeart 
        size={30}
        liked={liked}
        onLikeChange={setLiked}
        baseColor="#000"
        activeColor="#ff3366"
        gradientStartColor="#9b4dca"
        gradientEndColor="#ff6b8b"
      />
    </View>
  );
};

export default MyComponent;

```

## License
MIT