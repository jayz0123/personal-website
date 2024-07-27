import { findAreasForCountryCached } from '@/services/db/gallery';

type GenerateStaticParamsProps = {
  params: { countrySlug: string };
};

type GenerateStaticParams = (
  arg0: GenerateStaticParamsProps,
) => Promise<{ areaSlug: string }[]>;

// export const dynamicParams = false;

export let generateStaticParams: GenerateStaticParams | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (false) {
  generateStaticParams = async ({ params: { countrySlug } }) => {
    const areas = await findAreasForCountryCached(countrySlug);

    if (!areas) return [];

    return areas;
  };
}

export default async function AreaLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
      <div id="modal-root" />
    </>
  );
}
