import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface DroppaTruckLogoProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export default function DroppaTruckLogo({ 
  size = 80, 
  color = '#FF6200',
  style 
}: DroppaTruckLogoProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {/* Truck body - thân xe chính */}
        <Rect 
          x="8" 
          y="38" 
          width="52" 
          height="28" 
          rx="3" 
          fill={color} 
        />
        
        {/* Truck cabin - cabin lái xe */}
        <Path
          d="M60 38 L60 52 L78 52 L78 46 L72 38 Z"
          fill={color}
        />
        
        {/* Cabin window - cửa sổ cabin */}
        <Rect 
          x="63" 
          y="41" 
          width="7" 
          height="8" 
          rx="1.5" 
          fill="white" 
          opacity="0.9"
        />
        
        {/* Cabin door line - đường viền cửa */}
        <Path
          d="M 70 41 L 70 52"
          stroke="white"
          strokeWidth="1"
          opacity="0.4"
        />
        
        {/* Front grill - lưới tản nhiệt */}
        <Rect 
          x="74" 
          y="48" 
          width="4" 
          height="4" 
          rx="0.5" 
          fill="#404040" 
          opacity="0.8"
        />
        
        {/* Headlight - đèn pha */}
        <Circle 
          cx="76" 
          cy="44" 
          r="1.5" 
          fill="#FFE0B2" 
          opacity="0.9"
        />
        
        {/* Package icon - icon gói hàng trên thân xe */}
        <Rect 
          x="20" 
          y="44" 
          width="16" 
          height="14" 
          rx="2" 
          fill="white" 
          opacity="0.25"
        />
        <Path
          d="M 28 44 L 28 58"
          stroke="white"
          strokeWidth="2"
          opacity="0.4"
        />
        <Path
          d="M 20 51 L 36 51"
          stroke="white"
          strokeWidth="2"
          opacity="0.4"
        />
        
        {/* Front wheel - bánh trước (lớn hơn) */}
        <Circle 
          cx="20" 
          cy="66" 
          r="8" 
          fill="#2D2D2D"
        />
        <Circle 
          cx="20" 
          cy="66" 
          r="5" 
          fill="#525252"
        />
        <Circle 
          cx="20" 
          cy="66" 
          r="2.5" 
          fill="#E5E5E5"
        />
        
        {/* Back wheel - bánh sau (lớn hơn) */}
        <Circle 
          cx="65" 
          cy="66" 
          r="8" 
          fill="#2D2D2D"
        />
        <Circle 
          cx="65" 
          cy="66" 
          r="5" 
          fill="#525252"
        />
        <Circle 
          cx="65" 
          cy="66" 
          r="2.5" 
          fill="#E5E5E5"
        />
        
        {/* Wheel details - chi tiết bánh xe */}
        <Circle 
          cx="20" 
          cy="66" 
          r="3.5" 
          stroke="#404040"
          strokeWidth="0.5"
          fill="none"
        />
        <Circle 
          cx="65" 
          cy="66" 
          r="3.5" 
          stroke="#404040"
          strokeWidth="0.5"
          fill="none"
        />
        
        {/* Bumper - cản xe */}
        <Rect 
          x="78" 
          y="50" 
          width="2" 
          height="8" 
          rx="1" 
          fill="#404040"
        />
        
        {/* Side mirror - gương chiếu hậu */}
        <Rect 
          x="58" 
          y="42" 
          width="3" 
          height="2" 
          rx="0.5" 
          fill={color}
          opacity="0.8"
        />
        
        {/* Exhaust pipe - ống xả */}
        <Rect 
          x="56" 
          y="64" 
          width="2" 
          height="4" 
          rx="1" 
          fill="#404040"
        />
      </Svg>
    </View>
  );
}
