import { findCountriesCached } from '@/services/db/gallery';

export const dynamicParams = false;

export let generateStaticParams:
  | (() => Promise<{ countrySlug: string }[]>)
  | undefined = undefined;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
if (IS_PRODUCTION) {
  generateStaticParams = async () => {
    const countries = await findCountriesCached();

    if (!countries) return [];

    return countries;
  };
}

export default function CountryLayout({
  children,
  // params: { countrySlug },
}: {
  children: React.ReactNode;
  // params: { countrySlug: string };
}) {
  return (
    <section className="min-w-full gap-4 grid grid-cols-12">{children}</section>
  );
}
