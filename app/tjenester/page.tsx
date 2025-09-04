import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Tjenester - Kristins Brudesalong',
  description:
    'Våre tjenester inkluderer brudekjole-prøvetimer, tilpasning, tilbehør og bryllupskonsultasjon. Komplett service for din store dag.',
}

const services = [
  {
    id: 'provetime',
    title: 'Privat prøvetime',
    price: 'Fra 1.500 kr',
    duration: '2 timer',
    description:
      'En-til-en konsultasjon hvor du får prøve kjoler fra våre eksklusive kolleksjoner.',
    features: [
      'Personlig stilist',
      'Privat prøverom',
      'Champagne og godteri',
      'Profesjonelle råd',
      'Ingen tidspress',
    ],
    image: '/images/BACKGROUNDIMG1.avif',
    popular: true,
  },
  {
    id: 'tilpasning',
    title: 'Profesjonell tilpasning',
    price: 'Fra 5.000 kr',
    duration: '4-6 uker',
    description:
      'Skreddersydd tilpasning for perfekt passform og komfort på din store dag.',
    features: [
      'Flere tilpassinger',
      'Perfekt passform',
      'Kvalitetssikring',
      'Pressing inkludert',
      'Endelig kontroll',
    ],
    image: '/images/SelectionsfromEssenseofAustraliaIMG2.avif',
  },
  {
    id: 'tilbehor',
    title: 'Tilbehør og styling',
    price: 'Fra 800 kr',
    duration: '1 time',
    description: 'Komplett styling med slør, smykker, sko og andre tilbehør.',
    features: [
      'Slør og hårtilbehør',
      'Brudesmykker',
      'Sko og vesker',
      'Styling-rådgivning',
      'Komplett look',
    ],
    image: '/images/SelectionsfromJesusPeiroIMG3.avif',
  },
  {
    id: 'konsultasjon',
    title: 'Bryllupskonsultasjon',
    price: 'Gratis',
    duration: '45 min',
    description:
      'Få råd om drømmekjolen din og planlegg din perfekte bryllupsantrekk.',
    features: [
      'Stilanalyse',
      'Budsjettplanlegging',
      'Tidslinje for kjøp',
      'Inspirasjon og tips',
      'Ingen forpliktelser',
    ],
    image: '/images/PROFILEIMG.avif',
  },
]

const process = [
  {
    step: '01',
    title: 'Konsultasjon',
    description: 'Vi starter med en samtale om dine ønsker, stil og budsjett.',
  },
  {
    step: '02',
    title: 'Prøvetime',
    description:
      'Du prøver utvalgte kjoler i vårt private og komfortable prøverom.',
  },
  {
    step: '03',
    title: 'Tilpasning',
    description:
      'Vi tilpasser kjolen perfekt til din figur med profesjonelt håndverk.',
  },
  {
    step: '04',
    title: 'Levering',
    description: 'Din drømmekjole leveres ferdig til din store dag.',
  },
]

export default function TjenesterPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-b from-cream to-white py-24'>
        <div className='absolute inset-0 bg-[url("/images/BACKGROUNDIMG1.avif")] bg-cover bg-center opacity-10'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6'>
            Våre
            <span className='block text-rose-600'>Tjenester</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Fra den første konsultasjonen til den perfekte passformen - vi
            følger deg gjennom hele reisen mot din drømmekjole.
          </p>
          <Button size='lg' asChild>
            <Link href='/booking'>Book time i dag</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Komplett service for din store dag
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Vi tilbyr alt du trenger for å finne og tilpasse din perfekte
              brudekjole.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {services.map((service) => (
              <div key={service.id} className='relative group'>
                {service.popular && (
                  <div className='absolute -top-4 left-6 z-10'>
                    <span className='bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                      Mest populær
                    </span>
                  </div>
                )}

                <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                  <div className='relative h-64'>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-black/20'></div>
                    <div className='absolute bottom-4 left-6 text-white'>
                      <div className='text-2xl font-bold'>{service.price}</div>
                      <div className='text-sm opacity-90'>
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <div className='p-8'>
                    <h3 className='text-2xl font-serif font-bold text-gray-900 mb-3'>
                      {service.title}
                    </h3>
                    <p className='text-gray-600 mb-6'>{service.description}</p>

                    <ul className='space-y-2 mb-8'>
                      {service.features.map((feature, index) => (
                        <li key={index} className='flex items-center space-x-3'>
                          <div className='w-2 h-2 bg-rose-600 rounded-full'></div>
                          <span className='text-gray-700'>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className='w-full'
                      variant={service.popular ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href='/booking'>
                        {service.id === 'konsultasjon'
                          ? 'Book gratis konsultasjon'
                          : 'Book nå'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-20 bg-gradient-to-b from-white to-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Slik fungerer det
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Vår prosess er designet for å gi deg den beste opplevelsen fra
              start til slutt.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {process.map((step, index) => (
              <div key={index} className='text-center group'>
                <div className='relative mb-6'>
                  <div className='w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition-transform duration-300'>
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className='hidden lg:block absolute top-8 left-full w-full h-0.5 bg-rose-200 -translate-y-0.5'></div>
                  )}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {step.title}
                </h3>
                <p className='text-gray-600'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Ofte stilte spørsmål
            </h2>
          </div>

          <div className='space-y-6'>
            {[
              {
                q: 'Hvor lang tid tar en prøvetime?',
                a: 'En standard prøvetime tar ca. 2 timer. Dette gir oss god tid til å finne den perfekte kjolen uten stress.',
              },
              {
                q: 'Når bør jeg booke prøvetime?',
                a: 'Vi anbefaler å booke 6-12 måneder før bryllupet for best utvalg og god tid til tilpasning.',
              },
              {
                q: 'Hva koster tilpasning?',
                a: 'Tilpasning starter på 5.000 kr og varierer basert på hvor mye som må gjøres. Vi gir fast pris på forhånd.',
              },
              {
                q: 'Kan jeg ta med følge?',
                a: 'Absolutt! Du kan ta med inntil 3 personer til prøvetimen for å få deres mening og støtte.',
              },
            ].map((faq, index) => (
              <div key={index} className='border-b border-gray-200 pb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {faq.q}
                </h3>
                <p className='text-gray-600'>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-rose-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-serif font-bold text-white mb-6'>
            Klar til å starte reisen?
          </h2>
          <p className='text-xl text-rose-100 mb-8'>
            Book din første konsultasjon eller prøvetime i dag og ta det første
            steget mot din drømmekjole.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              variant='outline'
              className='bg-white text-rose-600 border-white hover:bg-rose-50'
              asChild
            >
              <Link href='/booking'>Book prøvetime</Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='text-white border-white hover:bg-white/10'
              asChild
            >
              <Link href='/kontakt'>Kontakt oss</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
