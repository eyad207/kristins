import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Heart, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function Home() {
  return (
    <div className='bg-white'>
      {/* Hero Section with Video */}
      <section className='relative overflow-hidden bg-gradient-to-br from-brand-cream to-brand-rose/20 min-h-[80vh] lg:min-h-[100vh]'>
        {/* Background Video */}
        <div className='absolute inset-0'>
          <video
            className='w-full h-full object-cover object-top animate-in fade-in zoom-in-50 duration-1000'
            autoPlay
            muted
            loop
            playsInline
          >
            <source src='/videos/file.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          <div className='absolute inset-0 bg-white/60 animate-in fade-in duration-1500'></div>
        </div>

        <div className='relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-6xl animate-in slide-in-from-bottom duration-1000 delay-300'>
              Finn din perfekte{' '}
              <span className='text-brand-gold'>drømmekjole</span>
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-900 animate-in slide-in-from-bottom duration-1000 delay-500'>
              Opplev Norges fremste brudesalong med eksklusive
              designer-kolleksjoner og personlig service. La oss hjelpe deg med
              å finne kjolen som gjør din store dag uforglemmelig.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6 animate-in slide-in-from-bottom duration-1000 delay-700'>
              <Link href={ROUTES.booking}>
                <Button size='lg'>
                  Book prøvetime
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </Link>
              <Link href={ROUTES.kolleksjoner}>
                <Button variant='outline' size='lg'>
                  Se kolleksjoner
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24 sm:py-32 scroll-mt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl animate-in slide-in-from-bottom duration-1000'>
              Hvorfor velge Kristins Brudesalong?
            </h2>
            <p className='mt-4 text-lg leading-8 text-gray-600 animate-in slide-in-from-bottom duration-1000 delay-200'>
              Vi tilbyr mer enn bare kjoler - vi skaper opplevelser som varer
              livet ut.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              <div className='flex flex-col group animate-in slide-in-from-bottom duration-1000 delay-300 hover:transform hover:scale-105 transition-all'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <Heart className='h-5 w-5 flex-none text-brand-gold transition-all duration-300 group-hover:scale-125 group-hover:text-brand-rose' />
                  Personlig service
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Hver kunde får dedikert oppmerksomhet fra våre erfarne
                    stylister. Vi lytter til dine ønsker og hjelper deg med å
                    finne den perfekte stilen.
                  </p>
                </dd>
              </div>
              <div className='flex flex-col group animate-in slide-in-from-bottom duration-1000 delay-500 hover:transform hover:scale-105 transition-all'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <Award className='h-5 w-5 flex-none text-brand-gold transition-all duration-300 group-hover:scale-125 group-hover:rotate-12' />
                  Eksklusive designere
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Vi samarbeider med internasjonalt anerkjente designere og
                    tilbyr kolleksjoner du ikke finner andre steder i Norge.
                  </p>
                </dd>
              </div>
              <div className='flex flex-col group animate-in slide-in-from-bottom duration-1000 delay-700 hover:transform hover:scale-105 transition-all'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <Users className='h-5 w-5 flex-none text-brand-gold transition-all duration-300 group-hover:scale-125 group-hover:text-brand-rose' />
                  Over 15 års erfaring
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Med over 15 års erfaring har vi hjulpet tusenvis av brud med
                    å finne deres drømmekjole og skape magiske øyeblikk.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Designer Collections Gallery */}
      <section className='bg-gray-50 py-24 sm:py-32 scroll-mt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl animate-in slide-in-from-bottom duration-1000'>
              Våre eksklusive designerkolleksjoner
            </h2>
            <p className='mt-4 text-lg leading-8 text-gray-600 animate-in slide-in-from-bottom duration-1000 delay-200'>
              Opplev de fineste brudekjolene fra internasjonalt anerkjente
              designere
            </p>
          </div>

          {/* Essense of Australia Collection */}
          <div className='mx-auto mt-16 max-w-7xl'>
            <div className='mb-12 animate-in slide-in-from-left duration-1000 delay-300'>
              <h3 className='text-2xl font-serif font-bold text-gray-900 mb-2'>
                Essense of Australia
              </h3>
              <p className='text-gray-600 mb-8'>
                Romantiske og tidløse kjoler med eksquisitt håndverk. Perfekt
                for den moderne bruden som ønsker klassisk eleganse.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='relative group overflow-hidden rounded-lg aspect-[3/5] animate-in slide-in-from-bottom duration-500 hover:scale-95 transform transition-all hover:shadow-2xl'>
                  <Image
                    src='/images/SelectionsfromEssenseofAustraliaIMG1.avif'
                    alt='Essense of Australia Collection 1'
                    fill
                    className='object-cover transition-transform duration-500 rounded-lg '
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm font-medium'>
                      Klassisk eleganse
                    </p>
                  </div>
                </div>
                <div className='relative group overflow-hidden rounded-lg aspect-[3/5] animate-in slide-in-from-bottom duration-500 hover:scale-95 transform transition-all hover:shadow-2xl'>
                  <Image
                    src='/images/SelectionsfromEssenseofAustraliaIMG2.avif'
                    alt='Essense of Australia Collection 2'
                    fill
                    className='object-cover transition-transform duration-500 rounded-lg '
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm font-medium'>
                      Moderne romantikk
                    </p>
                  </div>
                </div>
                <div className='relative group overflow-hidden rounded-lg aspect-[3/5] animate-in slide-in-from-bottom duration-500 hover:scale-95 transform transition-all hover:shadow-2xl'>
                  <Image
                    src='/images/SelectionsfromEssenseofAustraliaIMG3.avif'
                    alt='Essense of Australia Collection 3'
                    fill
                    className='object-cover transition-transform duration-500 rounded-lg '
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm font-medium'>
                      Tidløs skjønnhet
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-6 text-center animate-in slide-in-from-bottom duration-1000 delay-800'>
                <Link
                  href={`${ROUTES.kolleksjoner}?designer=essense-of-australia`}
                  className='inline-flex items-center text-brand-gold hover:text-brand-gold/80 font-semibold group transition-all duration-300 hover:translate-x-2'
                >
                  Se hele kolleksjonen
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </div>
            </div>

            {/* Jesus Peiro Collection */}
            <div className='mb-12 animate-in slide-in-from-right duration-1000 delay-900'>
              <h3 className='text-2xl font-serif font-bold text-gray-900 mb-2'>
                Jesus Peiro
              </h3>
              <p className='text-gray-600 mb-8'>
                Spanske mesterverker med dramatiske silhuetter og luksuriøse
                detaljer. For bruden som ønsker å gjøre et statement.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='relative group overflow-hidden rounded-lg aspect-[3/5] animate-in slide-in-from-bottom duration-500 hover:scale-95 transform transition-all hover:shadow-2xl'>
                  <Image
                    src='/images/SelectionsFromJesusPeiroIMG1.avif'
                    alt='Jesus Peiro Collection 1'
                    fill
                    className='object-cover transition-transform duration-500 rounded-lg '
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm font-medium'>
                      Dramatisk eleganse
                    </p>
                  </div>
                </div>
                <div className='relative group overflow-hidden rounded-lg aspect-[3/5] animate-in slide-in-from-bottom duration-500 hover:scale-95 transform transition-all hover:shadow-2xl'>
                  <Image
                    src='/images/SelectionsfromJesusPeiroIMG2.avif'
                    alt='Jesus Peiro Collection 2'
                    fill
                    className='object-cover transition-transform duration-500 rounded-lg '
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm font-medium'>
                      Luksuriøse detaljer
                    </p>
                  </div>
                </div>
                <div className='relative group overflow-hidden rounded-lg aspect-[3/5] animate-in slide-in-from-bottom duration-500 hover:scale-95 transform transition-all hover:shadow-2xl'>
                  <Image
                    src='/images/SelectionsfromJesusPeiroIMG3.avif'
                    alt='Jesus Peiro Collection 3'
                    fill
                    className='object-cover transition-transform duration-500 rounded-lg '
                  />
                  <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                    <p className='text-white text-sm font-medium'>
                      Spansk sofistikering
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-6 text-center animate-in slide-in-from-bottom duration-1000 delay-1300'>
                <Link
                  href={`${ROUTES.kolleksjoner}?designer=jesus-peiro`}
                  className='inline-flex items-center text-brand-gold hover:text-brand-gold/80 font-semibold group transition-all duration-300 hover:translate-x-2'
                >
                  Se hele kolleksjonen
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-24 sm:py-32 scroll-mt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-xl text-center'>
            <h2 className='text-lg font-semibold leading-8 tracking-tight text-brand-gold animate-in slide-in-from-bottom duration-1000'>
              Testimonials
            </h2>
            <p className='mt-2 text-3xl font-serif font-bold tracking-tight text-gray-900 sm:text-4xl animate-in slide-in-from-bottom duration-1000 delay-200'>
              Hva sier våre kunder?
            </p>
          </div>
          <div className='mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none'>
            <div className='-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3'>
              <div className='pt-8 sm:inline-block sm:w-full sm:px-4 animate-in slide-in-from-left duration-1000 delay-400'>
                <figure className='rounded-2xl bg-gray-50 p-8 text-sm leading-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group'>
                  <blockquote className='text-gray-900'>
                    <p>
                      Fantastisk opplevelse! Personalet var utrolig hjelpsomme
                      og kjolen var enda vakrere enn jeg hadde forestilt meg.
                      Anbefaler på det sterkeste!
                    </p>
                  </blockquote>
                  <figcaption className='mt-6 flex items-center gap-x-4'>
                    <div className='flex-auto'>
                      <div className='font-semibold text-gray-900'>
                        Maria Hansen
                      </div>
                      <div className='text-gray-600'>Brud 2023</div>
                    </div>
                    <div className='flex gap-x-1 text-brand-gold'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110'
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className='pt-8 sm:inline-block sm:w-full sm:px-4 animate-in slide-in-from-bottom duration-1000 delay-600'>
                <figure className='rounded-2xl bg-gray-50 p-8 text-sm leading-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group'>
                  <blockquote className='text-gray-900'>
                    <p>
                      Jeg fant drømmekjolen min her! Servicen var førsteklasses
                      og tilpasningen var perfekt. Tusen takk for at dere gjorde
                      dagen min så spesiell.
                    </p>
                  </blockquote>
                  <figcaption className='mt-6 flex items-center gap-x-4'>
                    <div className='flex-auto'>
                      <div className='font-semibold text-gray-900'>
                        Lisa Johansen
                      </div>
                      <div className='text-gray-600'>Brud 2024</div>
                    </div>
                    <div className='flex gap-x-1 text-brand-gold'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110'
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className='pt-8 sm:inline-block sm:w-full sm:px-4 animate-in slide-in-from-right duration-1000 delay-800'>
                <figure className='rounded-2xl bg-gray-50 p-8 text-sm leading-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg group'>
                  <blockquote className='text-gray-900'>
                    <p>
                      Profesjonelt team som virkelig bryr seg om kundene sine.
                      Opplevelsen var magisk fra start til slutt. Kommer
                      definitivt tilbake!
                    </p>
                  </blockquote>
                  <figcaption className='mt-6 flex items-center gap-x-4'>
                    <div className='flex-auto'>
                      <div className='font-semibold text-gray-900'>
                        Emma Nordahl
                      </div>
                      <div className='text-gray-600'>Brud 2024</div>
                    </div>
                    <div className='flex gap-x-1 text-brand-gold'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110'
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-brand-gold relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-brand-gold via-brand-gold/90 to-brand-gold/80'></div>
        <div className='relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl animate-in slide-in-from-bottom duration-1000'>
              Klar til å finne din drømmekjole?
            </h2>
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90 animate-in slide-in-from-bottom duration-1000 delay-200'>
              Book en prøvetime i dag og opplev den personlige servicen som har
              gjort oss til Norges foretrukne brudesalong.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6 animate-in slide-in-from-bottom duration-1000 delay-400'>
              <Link href={ROUTES.booking}>
                <Button size='lg'>
                  <span className='relative overflow-hidden'>
                    Book prøvetime nå
                    <span className='absolute inset-0 bg-brand-gold/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out skew-x-12'></span>
                  </span>
                </Button>
              </Link>
              <Link href={ROUTES.kontakt}>
                <Button variant='outline' size='lg'>
                  Kontakt oss
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
