import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Lookbook - Kristins Brudesalong',
  description:
    'Se våre vakre brudekjoler i aksjon. Inspirasjon fra ekte bryllup og eksklusive fotoshoot med våre designerkjoler.',
}

const lookbookCategories = [
  {
    id: 'essence-australia',
    title: 'Essense of Australia',
    subtitle: 'Moderne eleganse',
    images: [
      '/images/SelectionsfromEssenseofAustraliaIMG1.avif',
      '/images/SelectionsfromEssenseofAustraliaIMG2.avif',
      '/images/SelectionsfromEssenseofAustraliaIMG3.avif',
    ],
    description:
      'Opplev den perfekte balansen mellom moderne design og klassisk romantikk.',
  },
  {
    id: 'jesus-peiro',
    title: 'Jesús Peiró',
    subtitle: 'Spansk sofistikering',
    images: [
      '/images/SelectionsFromJesusPeiroIMG1.avif',
      '/images/SelectionsfromJesusPeiroIMG2.avif',
      '/images/SelectionsfromJesusPeiroIMG3.avif',
    ],
    description:
      'Håndverkskunst og eleganse fra Spanias fremste brudekjole-designer.',
  },
]

const featuredLooks = [
  {
    image: '/images/BACKGROUNDIMG1.avif',
    title: 'Klassisk romantikk',
    bride: 'Emma & Thomas',
    venue: 'Aker Brygge, Oslo',
    description: 'En drømmeaktig dag med klassisk eleganse',
  },
  {
    image: '/images/PROFILEIMG.avif',
    title: 'Moderne glamour',
    bride: 'Sofia & Marcus',
    venue: 'Bygdøy Kongsgård',
    description: 'Sofistikert stil i historiske omgivelser',
  },
]

const styleGuide = [
  {
    style: 'Ballkjole',
    description: 'Klassisk prinsesse-silhuett med stort skjørt',
    bestFor: 'Formelle bryllup, eventyr-tema',
    icon: '👑',
  },
  {
    style: 'A-linje',
    description: 'Universelt flatterende form som passer alle figurer',
    bestFor: 'Alle anledninger, tidløs eleganse',
    icon: '💃',
  },
  {
    style: 'Havfrue',
    description: 'Tett passform som følger kroppens konturer',
    bestFor: 'Glamorøse bryllup, moderne stil',
    icon: '🧜‍♀️',
  },
  {
    style: 'Rettkjørt',
    description: 'Ren og enkel linje fra topp til tå',
    bestFor: 'Minimalistisk stil, korte bryder',
    icon: '📏',
  },
]

export default function LookbookPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-b from-black via-gray-900 to-black py-32'>
        <div className='absolute inset-0 bg-[url("/images/BACKGROUNDIMG1.avif")] bg-cover bg-center opacity-30'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-5xl md:text-7xl font-serif font-bold text-white mb-6'>
            Lookbook
          </h1>
          <p className='text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8'>
            Inspirasjon fra våre vakre kolleksjoner og ekte bryllup
          </p>
          <Button
            size='lg'
            variant='outline'
            className='border-white text-white hover:bg-white hover:text-black'
            asChild
          >
            <Link href='/booking'>Book prøvetime</Link>
          </Button>
        </div>
      </section>

      {/* Collection Showcases */}
      {lookbookCategories.map((category, categoryIndex) => (
        <section
          key={category.id}
          className={`py-20 ${
            categoryIndex % 2 === 0
              ? 'bg-white'
              : 'bg-gradient-to-b from-cream to-white'
          }`}
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-serif font-bold text-gray-900 mb-4'>
                {category.title}
              </h2>
              <p className='text-xl text-rose-600 font-medium mb-6'>
                {category.subtitle}
              </p>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                {category.description}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {category.images.map((image, index) => (
                <div
                  key={index}
                  className='group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl'
                >
                  <Image
                    src={image}
                    alt={`${category.title} kjole ${index + 1}`}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <p className='text-sm font-medium'>Se detaljer</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='text-center mt-12'>
              <Button asChild>
                <Link href={`/kolleksjoner#${category.id}`}>
                  Se hele kolleksjonen
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ))}

      {/* Featured Looks */}
      <section className='py-20 bg-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-serif font-bold text-white mb-4'>
              Utvalgte bryllup
            </h2>
            <p className='text-xl text-gray-300'>
              Se våre kjoler i aksjon på ekte bryllup
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-12'>
            {featuredLooks.map((look, index) => (
              <div key={index} className='group'>
                <div className='relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-2xl'>
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent'></div>
                  <div className='absolute bottom-6 left-6 text-white'>
                    <p className='text-sm text-gray-300 mb-2'>{look.venue}</p>
                    <h3 className='text-2xl font-serif font-bold mb-2'>
                      {look.bride}
                    </h3>
                    <p className='text-gray-200'>{look.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Guide */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-serif font-bold text-gray-900 mb-4'>
              Finn din stil
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Utforsk ulike kjolestiler og finn den som passer perfekt til din
              figur og personlighet
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {styleGuide.map((style, index) => (
              <div
                key={index}
                className='text-center group hover:bg-gradient-to-b hover:from-rose-50 hover:to-cream rounded-2xl p-6 transition-all duration-300'
              >
                <div className='text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>
                  {style.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {style.style}
                </h3>
                <p className='text-gray-600 mb-4'>{style.description}</p>
                <div className='bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium inline-block'>
                  {style.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Mockup */}
      <section className='py-20 bg-gradient-to-b from-white to-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-serif font-bold text-gray-900 mb-4'>
              Følg oss på Instagram
            </h2>
            <p className='text-xl text-gray-600 mb-8'>
              Se daglige oppdateringer av våre vakre kjoler og fornøyde bryder
            </p>
            <Button variant='outline' asChild>
              <Link
                href='https://instagram.com/kristinsbrudesalong'
                target='_blank'
              >
                @kristinsbrudesalong
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {lookbookCategories[0].images
              .concat(lookbookCategories[1].images)
              .slice(0, 8)
              .map((image, index) => (
                <div
                  key={index}
                  className='aspect-square rounded-lg overflow-hidden shadow-lg group'
                >
                  <Image
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    width={300}
                    height={300}
                    className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500'
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-rose-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl md:text-5xl font-serif font-bold text-white mb-6'>
            Klar til å skape din egen historie?
          </h2>
          <p className='text-xl text-rose-100 mb-8'>
            La oss hjelpe deg med å finne kjolen som gjør din bryllupsdag
            uforglemmelig.
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
              <Link href='/kolleksjoner'>Se kolleksjoner</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
