import { Image } from 'react-native';
import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

const BRAND_LOGO_ASPECT_RATIO = 216 / 244;
const splashLogo = require('@/assets/yumQuick-splash.png');

export type BrandLogoProps = {
  width?: number;
  style?: StyleProp<ImageStyle>;
  source?: ImageSourcePropType;
};

export function BrandLogo({ width = 216, style, source = splashLogo }: BrandLogoProps) {
  return (
    <Image
      source={source}
      resizeMode='contain'
      style={[
        {
          width,
          aspectRatio: BRAND_LOGO_ASPECT_RATIO
        },
        style
      ]}
    />
  );
}
