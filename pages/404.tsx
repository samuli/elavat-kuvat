import AppLink from '@/components/Link';

export default function Custom404(): JSX.Element {
  return (
    <div className="mt-2">
      <h1>Sivua ei löydy...</h1>
      <p>
        <AppLink href="/">
          <a className="underline">Palaa etusivulle</a>
        </AppLink>
      </p>
    </div>
  );
}
