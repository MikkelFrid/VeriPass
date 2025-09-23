import APIKeysContainer from '@/components/apiKey/APIKeysContainer';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import env from '@/lib/env';
import { AccountLayout } from '@/components/layouts';

const APIKeys = ({ teamFeatures }) => {
  return <APIKeysContainer teamFeatures={teamFeatures} />;
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  if (!env.teamFeatures.apiKey) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      teamFeatures: env.teamFeatures,
    },
  };
}

APIKeys.getLayout = (page) => <AccountLayout>{page}</AccountLayout>;

export default APIKeys;
