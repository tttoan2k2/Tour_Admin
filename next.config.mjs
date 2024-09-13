/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
