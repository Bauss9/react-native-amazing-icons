declare module 'react-native-amazing-icons' {
    import { ComponentProps } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface AnimatedHeartProps {
      size?: number;
      liked?: boolean;
      baseColor?: string;
      activeColor?: string;
      gradientStartColor?: string;
      gradientEndColor?: string;
      onLikeChange?: (liked: boolean) => void;
      style?: ViewStyle;
    }
  
    const AnimatedHeart: React.FC<AnimatedHeartProps>;
    export default AnimatedHeart;
  }
  