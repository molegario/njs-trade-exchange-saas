const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      }
    ]
  }

}

module.exports = nextConfig