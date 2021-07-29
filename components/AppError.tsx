import AppLink from '@/components/Link';

const AppError = () => (
    <div className="mt-2">
      <h1>Kröhöm.... jokin meni vikaan. </h1>
      <p>Kokeile ladata sivu uudelleen tai <AppLink href="/"><a className="underline">palaa etusivulle</a></AppLink></p>
    </div>
);

export default AppError;
