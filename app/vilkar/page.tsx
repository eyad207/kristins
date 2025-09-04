import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Vilkår og betingelser - Kristins Brudesalong',
  description:
    'Les våre vilkår og betingelser for tjenester hos Kristins Brudesalong.',
}

export default function VilkarPage() {
  return (
    <main className='min-h-screen bg-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-serif font-bold text-gray-900 mb-6'>
            Vilkår og betingelser
          </h1>
          <p className='text-xl text-gray-600'>Oppdatert: 4. september 2025</p>
        </div>

        <div className='prose prose-lg max-w-none'>
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              1. Generelt
            </h2>
            <p className='text-gray-600 mb-4'>
              Disse vilkårene gjelder for alle tjenester levert av Kristins
              Brudesalong AS (org.nr. 123 456 789). Ved å benytte våre tjenester
              aksepterer du disse vilkårene.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              2. Booking og prøvetimer
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Booking
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>
                    Prøvetimer må bookes på forhånd via vårt bookingsystem,
                    telefon eller e-post
                  </li>
                  <li>Vi anbefaler å booke minst 2 uker i forveien</li>
                  <li>Booking bekreftes skriftlig via e-post</li>
                  <li>Alle priser er oppgitt i norske kroner inkl. MVA</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Avbestilling og endring
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>
                    Gratis avbestilling/endring inntil 48 timer før avtalt tid
                  </li>
                  <li>
                    Ved avbestilling senere enn 48 timer belastes 50% av
                    timeprisen
                  </li>
                  <li>Ved uteblivelse belastes full timepris</li>
                  <li>Force majeure unntas fra disse reglene</li>
                </ul>
              </div>
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              3. Kjøp av brudekjole
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Bestilling og betaling
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>
                    Ved bestilling kreves et depositum på minimum 50% av
                    kjoleprisen
                  </li>
                  <li>Resterende beløp forfaller ved ferdigstilling</li>
                  <li>Vi aksepterer kort, Vipps og bankoverføring</li>
                  <li>Betalingsplan kan avtales individuelt</li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Leveringstid
                </h3>
                <ul className='list-disc list-inside text-gray-600 space-y-1'>
                  <li>Standard leveringstid er 4-6 måneder</li>
                  <li>Tilpasning tar ytterligere 4-6 uker</li>
                  <li>Express-levering kan avtales mot tillegg</li>
                  <li>Vi anbefaler bestilling 6-12 måneder før bryllupet</li>
                </ul>
              </div>
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              4. Tilpasning og endringer
            </h2>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>
                Tilpasning er inkludert i kjoleprisen (inntil 3 prøvinger)
              </li>
              <li>
                Større endringer i design eller størrelse kan medføre
                tilleggskostnader
              </li>
              <li>Vi kan ikke garantere at alle ønskede endringer er mulige</li>
              <li>Endringer må godkjennes skriftlig før utførelse</li>
              <li>Pressing og finale kontroll er inkludert</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              5. Angrerett og retur
            </h2>
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4'>
              <p className='text-yellow-800 font-medium'>
                Viktig: Brudekjoler er spesialprodukter som produseres på
                bestilling.
              </p>
            </div>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>Angrerett gjelder ikke for spesialtilpassede brudekjoler</li>
              <li>Kjøpet er bindende når produksjon er startet</li>
              <li>
                Ved feil fra vår side eller defekte produkter tilbys full
                refusjon
              </li>
              <li>
                Retur av kjole som ikke er tilpasset kan vurderes individuelt
              </li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              6. Reklamasjon og garanti
            </h2>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>Vi garanterer kvalitet i materialer og håndverk</li>
              <li>Reklamasjon må meldes innen rimelig tid etter levering</li>
              <li>
                Ved berettiget reklamasjon tilbys reparasjon, omlevering eller
                prisavslag
              </li>
              <li>Normal slitasje dekkes ikke av garantien</li>
              <li>Skader forårsaket av feil bruk dekkes ikke</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              7. Force majeure
            </h2>
            <p className='text-gray-600'>
              Vi er ikke ansvarlige for forsinkelser eller manglende levering
              som skyldes forhold utenfor vår kontroll, som naturkatastrofer,
              krig, streik, pandemier eller leverandørproblemer.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              8. Ansvarsbegrensning
            </h2>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>
                Vårt ansvar er begrenset til kjøpesummen for den aktuelle
                varen/tjenesten
              </li>
              <li>Vi er ikke ansvarlige for indirekte tap eller følgeskader</li>
              <li>
                Dette gjelder ikke ved grov uaktsomhet eller forsett fra vår
                side
              </li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              9. Bilder og markedsføring
            </h2>
            <p className='text-gray-600 mb-4'>
              Ved å benytte våre tjenester samtykker du til:
            </p>
            <ul className='list-disc list-inside text-gray-600 space-y-2'>
              <li>At vi kan ta bilder under prøvetimen for dokumentasjon</li>
              <li>
                At vi kan bruke anonymiserte bilder til markedsføring (med
                separat samtykke)
              </li>
              <li>At vi kan kontakte deg for tilbakemelding og vurdering</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              10. Jurisdiksjon og lovvalg
            </h2>
            <p className='text-gray-600'>
              Disse vilkårene er underlagt norsk rett. Eventuelle tvister løses
              ved ordinære norske domstoler, med Oslo tingrett som verneting.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
              11. Kontaktinformasjon
            </h2>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-gray-600'>
                <strong>Kristins Brudesalong AS</strong>
                <br />
                Org.nr: 123 456 789
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
              12. Endringer i vilkårene
            </h2>
            <p className='text-gray-600'>
              Vi forbeholder oss retten til å endre disse vilkårene. Vesentlige
              endringer vil bli kommunisert i rimelig tid på forhånd.
            </p>
          </section>
        </div>

        <div className='text-center mt-16'>
          <Button asChild>
            <Link href='/kontakt'>Spørsmål om vilkårene? Kontakt oss</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
