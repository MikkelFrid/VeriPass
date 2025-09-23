import { Teams } from '@/components/team';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types';
import { AccountLayout } from '@/components/layouts'; // ← add this

const AllTeams: NextPageWithLayout = () => {
  return <Teams />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

AllTeams.getLayout = (page) => <AccountLayout>{page}</AccountLayout>;

export default AllTeams;