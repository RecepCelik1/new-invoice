import withFonts from 'next-fonts';
import withImages from 'next-images';

/** @type {import('next').NextConfig} */
const nextConfig = withImages(withFonts({
  webpack(config, options) {
    return config;
  },
}));

export default nextConfig;
