import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Kolleksjoner - Kristins Brudesalong',
  description:
    'Utforsk våre eksklusive brudekjole-kolleksjoner fra verdens ledende designere. Fra klassisk eleganse til moderne glamour.',
}

const collections = [
  {
    id: 'essence-of-australia',
    name: 'Essense of Australia',
    description:
      'Moderne eleganse møter tidløs romantikk i denne eksklusive kolleksjonen.',
    image: '/images/SelectionsfromEssenseofAustraliaIMG1.avif',
    priceRange: 'Fra 25.000 kr',
    features: ['Moderne snitt', 'Luksus materialer', 'Personlig tilpasning'],
  },
  {
    id: 'jesus-peiro',
    name: 'Jesús Peiró',
    description:
      'Spansk eleganse og sofistikert håndverk i hver eneste detalj.',
    image: '/images/SelectionsFromJesusPeiroIMG1.avif',
    priceRange: 'Fra 30.000 kr',
    features: ['Spansk design', 'Håndarbeid', 'Unike detaljer'],
  },
  {
    id: 'vintage-collection',
    name: 'Vintage Collection',
    description: 'Klassiske design inspirert av glamour fra fortiden.',
    image: '/images/SelectionsfromJesusPeiroIMG2.avif',
    priceRange: 'Fra 20.000 kr',
    features: ['Vintage inspirert', 'Tidløse snitt', 'Klassisk eleganse'],
  },
]

const features = [
  {
    icon: '✨',
    title: 'Eksklusiv kvalitet',
    description: 'Kun de fineste materialer og mest erfarne håndverkere',
  },
  {
    icon: '👗',
    title: 'Personlig tilpasning',
    description: 'Hver kjole skreddersys perfekt til din figur',
  },
  {
    icon: '💎',
    title: 'Unike design',
    description: 'Kolleksjoner du ikke finner andre steder i Norge',
  },
  {
    icon: '🎯',
    title: 'Perfekt passform',
    description: 'Profesjonell tilpasning for optimal komfort og stil',
  },
]

export default function KolleksjonerPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-b from-cream to-white py-24'>
        <div className='absolute inset-0 bg-[url("/images/BACKGROUNDIMG1.avif")] bg-cover bg-center opacity-10'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6'>
            Våre eksklusive
            <span className='block text-rose-600'>Kolleksjoner</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Utforsk våre nøye utvalgte kolleksjoner fra verdens mest
            prestisjefylte brudekjole-designere. Fra klassisk eleganse til
            moderne glamour.
          </p>
          <Button size='lg' asChild>
            <Link href='/booking'>Book prøvetime</Link>
          </Button>
        </div>
      </section>

      {/* Collections Grid */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Utvalgte kolleksjoner
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Hver kolleksjon representerer det beste innen brudekjole-design,
              med unike stiler som passer alle smaker og anledninger.
            </p>
          </div>

          <div className='grid gap-12 lg:gap-16'>
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className='relative aspect-[3/5] rounded-2xl overflow-hidden shadow-xl'>
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className='object-cover hover:scale-105 transition-transform duration-700'
                    />
                  </div>
                </div>

                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <div>
                    <h3 className='text-3xl font-serif font-bold text-gray-900 mb-3'>
                      {collection.name}
                    </h3>
                    <p className='text-lg text-gray-600 mb-4'>
                      {collection.description}
                    </p>
                    <p className='text-xl font-semibold text-rose-600'>
                      {collection.priceRange}
                    </p>
                  </div>

                  <div className='space-y-3'>
                    {collection.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className='flex items-center space-x-3'
                      >
                        <div className='w-2 h-2 bg-rose-600 rounded-full'></div>
                        <span className='text-gray-700'>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button size='lg' asChild>
                      <Link href='/booking'>Book prøvetime</Link>
                    </Button>
                    <Button variant='outline' size='lg' asChild>
                      <Link href='/lookbook'>Se lookbook</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-gradient-to-b from-white to-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Hvorfor velge våre kolleksjoner?
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Vi tilbyr ikke bare kjoler, men en komplett opplevelse med fokus
              på kvalitet og service.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div key={index} className='text-center group'>
                <div className='text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-rose-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-serif font-bold text-white mb-6'>
            Klar til å finne din drømmekjole?
          </h2>
          <p className='text-xl text-rose-100 mb-8'>
            Book en privat prøvetime og opplev våre eksklusive kolleksjoner med
            personlig service.
          </p>
          <Button
            size='lg'
            variant='outline'
            className='bg-white text-rose-600 border-white hover:bg-rose-50'
            asChild
          >
            <Link href='/booking'>Book prøvetime nå</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
