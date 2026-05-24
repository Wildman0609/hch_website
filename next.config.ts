import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd()
  },
  async redirects() {
    return [
      {
        source: "/find-hollyman-care-homes-norfolk",
        destination: "/find-your-home",
        permanent: true
      },
      {
        source: "/our-care",
        destination: "/care-services",
        permanent: true
      },
      {
        source: "/our-care-nutrition",
        destination: "/care-services",
        permanent: true
      },
      {
        source: "/dementia-care-in-norwich-and-great-yarmouth",
        destination: "/care-services/dementia-care",
        permanent: true
      },
      {
        source: "/residential-care",
        destination: "/care-services/residential-care",
        permanent: true
      },
      {
        source: "/respite-care",
        destination: "/care-services/respite-care",
        permanent: true
      },
      {
        source: "/palliative-care",
        destination: "/care-services/palliative-care",
        permanent: true
      },
      {
        source: "/broadlands-park-care-home",
        destination: "/homes/broadlands-park",
        permanent: true
      },
      {
        source: "/broadland-house-care-home",
        destination: "/homes/broadland-house",
        permanent: true
      },
      {
        source: "/martham-lodge-care-home",
        destination: "/homes/martham-lodge",
        permanent: true
      },
      {
        source: "/braydeston-court-care-home",
        destination: "/homes/braydeston-court",
        permanent: true
      },
      {
        source: "/contact-hollyman-care-homes",
        destination: "/contact",
        permanent: true
      },
      {
        source: "/room-enquiries",
        destination: "/contact",
        permanent: true
      },
      {
        source: "/contact-hollyman-care-homes/job-vacancies",
        destination: "/careers",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
