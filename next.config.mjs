/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                hostname: "encrypted-tbn0.gstatic.com",
                protocol: "https",
                port: "",

            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https",
                port: "",

            }
        ]
    }
};

export default nextConfig;
