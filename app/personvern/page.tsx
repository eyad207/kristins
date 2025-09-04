import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Personvern - Kristins Brudesalong',
  description:
    'Les om hvordan vi behandler dine personopplysninger og beskytter ditt privatliv hos Kristins Brudesalong.',
}

export default function PersonvernPage() {
  return (
    <main className='min-h-screen bg-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-serif font-bold text-gray-900 mb-6'>
            Personvernerklæring
          </h1>
          <p className='text-xl text-gray-600'>Oppdatert: 4. september 2025</p>
        </div>

        <div className='prose prose-lg max-w-none'>
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              1. Innledning
            </h2>
            <p className='text-gray-600 mb-4'>
              Kristins Brudesalong AS (org.nr. 123 456 789) tar ditt personvern
              på alvor. Denne personvernerklæringen beskriver hvordan vi samler
              inn, bruker og beskytter dine personopplysninger når du bruker
              våre tjenester.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              2. Hvilke opplysninger samler vi inn?
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Kontaktinformasjon:
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>Navn og kontaktinformasjon</li>
                  <li>E-postadresse og telefonnummer</li>
                  <li>Adresse</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Booking-informasjon:
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>Ønskede tjenester og prøvetider</li>
                  <li>Spesielle ønsker og notater</li>
                  <li>Betalingsinformasjon (behandles av tredjeparter)</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Teknisk informasjon:
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>IP-adresse og enhetsopplysninger</li>
                  <li>Informasjonskapsler (cookies)</li>
                  <li>Bruksmønstre på nettsiden</li>
                </ul>
              </div>
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              3. Hvordan bruker vi opplysningene?
            </h2>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>Administrere bookinger og avtaler</li>
              <li>Kommunisere med deg om dine tjenester</li>
              <li>Forbedre våre tjenester og kundeopplevelse</li>
              <li>Sende påminnelser og oppfølging</li>
              <li>Markedsføring (kun med ditt samtykke)</li>
              <li>Oppfylle juridiske forpliktelser</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              4. Deling av opplysninger
            </h2>
            <p className='text-gray-600 mb-4'>
              Vi deler ikke dine personopplysninger med tredjeparter, unntatt:
            </p>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>
                Betalingsleverandører (Stripe, Vipps) for behandling av
                betalinger
              </li>
              <li>
                E-postleverandør (Resend) for å sende bekreftelses-e-poster
              </li>
              <li>Når loven krever det</li>
              <li>Med ditt eksplisitte samtykke</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              5. Dine rettigheter
            </h2>
            <p className='text-gray-600 mb-4'>
              I henhold til GDPR har du følgende rettigheter:
            </p>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>
                <strong>Rett til innsyn:</strong> Se hvilke opplysninger vi har
                om deg
              </li>
              <li>
                <strong>Rett til retting:</strong> Korrigere feil i dine
                opplysninger
              </li>
              <li>
                <strong>Rett til sletting:</strong> Få slettet dine opplysninger
              </li>
              <li>
                <strong>Rett til begrensning:</strong> Begrense behandlingen av
                dine opplysninger
              </li>
              <li>
                <strong>Rett til dataportabilitet:</strong> Få dine opplysninger
                i strukturert format
              </li>
              <li>
                <strong>Rett til å trekke tilbake samtykke:</strong> Når som
                helst
              </li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              6. Sikkerhet
            </h2>
            <p className='text-gray-600 mb-4'>
              Vi bruker industry-standard sikkerhetstiltak for å beskytte dine
              opplysninger:
            </p>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>SSL-kryptering for all dataoverføring</li>
              <li>Sikre databaser med tilgangskontroll</li>
              <li>Regelmessige sikkerhetsoppdateringer</li>
              <li>Begrenset tilgang til personopplysninger</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              7. Oppbevaring
            </h2>
            <p className='text-gray-600'>
              Vi oppbevarer dine personopplysninger bare så lenge det er
              nødvendig for formålene beskrevet i denne erklæringen, eller som
              kreves av lov. Typisk oppbevares kundeopplysninger i 3 år etter
              siste kontakt.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              8. Informasjonskapsler (Cookies)
            </h2>
            <p className='text-gray-600 mb-4'>
              Vi bruker informasjonskapsler for:
            </p>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>Teknisk nødvendige funksjoner</li>
              <li>Forbedre brukeropplevelsen</li>
              <li>Analysere bruksmønstre (anonymisert)</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              9. Kontakt oss
            </h2>
            <p className='text-gray-600 mb-4'>
              Har du spørsmål om denne personvernerklæringen eller vil utøve
              dine rettigheter, kan du kontakte oss:
            </p>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-600'>
                <strong>Kristins Brudesalong AS</strong>
                <br />
                E-post: post@kristins-brudesalong.no
                <br />
                Telefon: +47 123 45 678
                <br />
                Adresse: Bogstadveien 123, 0366 Oslo
              </p>
            </div>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              10. Endringer
            </h2>
            <p className='text-gray-600'>
              Vi kan oppdatere denne personvernerklæringen fra tid til annen.
              Vesentlige endringer vil bli kommunisert via e-post eller på våre
              nettsider.
            </p>
          </section>
        </div>

        <div className='text-center mt-16'>
          <Button asChild>
            <Link href='/kontakt'>Har du spørsmål? Kontakt oss</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
