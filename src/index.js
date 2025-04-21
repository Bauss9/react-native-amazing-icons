// src/index.js
import React, { useState, useRef } from 'react';
import { TouchableWithoutFeedback, Animated, View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedHeart = ({
  size = 30,
  liked = false,
  baseColor = '#000',
  activeColor = '#ff3366',
  gradientStartColor = '#9b4dca', // Purple
  gradientEndColor = '#ff6b8b', // Light red
  onLikeChange,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const translateY = useRef(new Animated.Value(0)).current;
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const jumpingOpacity = useRef(new Animated.Value(0)).current;
  const filledOpacity = useRef(new Animated.Value(isLiked ? 1 : 0)).current;
  const outlineOpacity = useRef(new Animated.Value(isLiked ? 0 : 1)).current;

  // Heart path (standard SVG heart shape)
  const heartPath = "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z";

  const handleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    
    if (onLikeChange) {
      onLikeChange(newLikeState);
    }

    if (newLikeState) {
      // Reset animation values
      translateY.setValue(0);
      scaleX.setValue(1);
      scaleY.setValue(1);
      jumpingOpacity.setValue(0);
      outlineOpacity.setValue(1);
      
      // Simple animation sequence
      Animated.sequence([
        // Show the jumping heart
        Animated.timing(jumpingOpacity, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        
        // Jump up and get wider - faster now
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -size * 2,
            duration: 100,  // Faster jump (was 250ms)
            useNativeDriver: true,
          }),
          Animated.timing(scaleX, {
            toValue: 1.3,   // 30% wider horizontally
            duration: 200,  // Same duration as jump
            useNativeDriver: true,
          }),
          Animated.timing(scaleY, {
            toValue: 1.3,   // 10% taller
            duration: 200,  // Same duration as jump
            useNativeDriver: true,
          }),
        ]),
        
        // Small pause at the top
        Animated.delay(5),
        
        // Fade out outline a bit later (after the small pause)
        Animated.timing(outlineOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        
        // Come back down and return to normal size
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 220,  // Slightly slower coming down
            useNativeDriver: true,
          }),
          Animated.timing(scaleX, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(scaleY, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
        ]),
        
        // Show filled heart and hide jumping heart
        Animated.parallel([
          Animated.timing(filledOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(jumpingOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      // Unlike animation
      Animated.parallel([
        Animated.timing(filledOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(outlineOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleLike}>
      <View style={[styles.container, {width: size, height: size}]}>
        {/* Base heart outline */}
        <Animated.View style={[styles.heartLayer, { opacity: outlineOpacity }]}>
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d={heartPath}
              fill="transparent"
              stroke={baseColor}
              strokeWidth="1.5"
            />
          </Svg>
        </Animated.View>
        
        {/* Filled heart */}
        <Animated.View style={[styles.heartLayer, { opacity: filledOpacity }]}>
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d={heartPath}
              fill={activeColor}
              stroke={activeColor}
              strokeWidth="1.5"
            />
          </Svg>
        </Animated.View>
        
        {/* Jumping heart with gradient */}
        <Animated.View style={[
          styles.heartLayer,
          {
            opacity: jumpingOpacity,
            transform: [
              { translateY },
              { scaleX },
              { scaleY }
            ]
          }
        ]}>
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={gradientStartColor} />
                <Stop offset="0.5" stopColor={gradientEndColor} />
                <Stop offset="1" stopColor={activeColor} />
              </LinearGradient>
            </Defs>
            <Path
              d={heartPath}
              fill="url(#heartGradient)"
              stroke="none"
            />
          </Svg>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartLayer: {
    position: 'absolute',
  }
});

export default AnimatedHeart;