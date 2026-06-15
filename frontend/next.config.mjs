/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // true triggers a 301 redirect, false triggers a 307
      },
    ];
  },
};

export default nextConfig;
