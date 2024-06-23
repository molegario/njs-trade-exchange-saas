const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      }
    ]
  }

}

module.exports = nextConfig