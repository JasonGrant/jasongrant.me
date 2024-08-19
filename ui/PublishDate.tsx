import React from 'react';

export async function getStaticProps() {
  // Get the build time
  const buildDate = new Date().toISOString();

  return {
    props: {
      buildDate,
    },
    revalidate: 60, // Optional: Revalidate every 60 seconds
  };
}

const PublishDate = ({ buildDate }: { buildDate: string }) => {
  return (
    <div>
      <h1>Website Publish Date</h1>
      <p>Last published on: {new Date(buildDate).toLocaleString()}</p>
    </div>
  );
};

export default PublishDate;