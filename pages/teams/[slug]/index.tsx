import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  return {
    redirect: {
      destination: `/teams/${encodeURIComponent(slug)}/settings`,
      permanent: false,
    },
  };
};

export default function TeamIndexRedirect() {
  return null;
}
