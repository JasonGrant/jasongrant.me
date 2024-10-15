/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/about',
                destination: '/narrative/about',
                permanent: true,
            },
        ];
    }
};


export default nextConfig;
