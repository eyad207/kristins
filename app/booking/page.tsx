import { Metadata } from 'next'
import { BookingWizard } from '@/components/booking/BookingWizard'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Book prøvetime - Kristins Brudesalong',
  description:
    'Book din personlige prøvetime hos Kristins Brudesalong. Finn din drømmekjole med våre erfarne brude-stylister i et luksus miljø.',
}

interface BookingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function BookingContent({ searchParams }: BookingPageProps) {
  const resolvedSearchParams = await searchParams
  const serviceId =
    typeof resolvedSearchParams.service === 'string'
      ? resolvedSearchParams.service
      : undefined

  return (
    <main className='min-h-screen bg-gradient-to-b from-cream via-white to-cream'>
      {/* Hero Section */}
      <section className='relative py-20 lg:py-24'>
        <div className='absolute inset-0 bg-[url("/images/BACKGROUNDIMG1.avif")] bg-cover bg-center opacity-5'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium mb-6'>
              ✨ Eksklusive prøvetimer med personlig service
            </div>
            <h1 className='text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6'>
              Book din
              <span className='block text-rose-600'>
                drømmekjole-opplevelse
              </span>
            </h1>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
              Oppdag magien i vår eksklusive brudesalong. Med over 15 års
              erfaring hjelper vi deg med å finne den perfekte kjolen for din
              store dag.
            </p>

            {/* Trust indicators */}
            <div className='flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-12'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-rose-600 rounded-full'></div>
                <span>2000+ fornøyde bryder</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-rose-600 rounded-full'></div>
                <span>Privat prøverom</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-rose-600 rounded-full'></div>
                <span>Eksklusive designere</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-rose-600 rounded-full'></div>
                <span>Personlig stylist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Wizard Section */}
      <section className='pb-20'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
            <div className='p-8 lg:p-12'>
              <BookingWizard initialServiceId={serviceId} />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-20 bg-gradient-to-r from-rose-50 via-white to-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Hva gjør vår prøvetime spesiell?
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Vi tilbyr mer enn bare en prøvetime - det er en komplett
              opplevelse.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                icon: '👗',
                title: 'Eksklusive kjoler',
                description: 'Kolleksjoner du ikke finner andre steder i Norge',
              },
              {
                icon: '🥂',
                title: 'VIP-behandling',
                description: 'Champagne, godteri og personlig oppmerksomhet',
              },
              {
                icon: '💎',
                title: 'Erfarne stylister',
                description: 'Over 15 års erfaring med brudestyling',
              },
              {
                icon: '🎯',
                title: 'Perfekt passform',
                description: 'Profesjonell tilpasning for optimal komfort',
              },
            ].map((benefit, index) => (
              <div key={index} className='text-center group'>
                <div className='text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>
                  {benefit.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {benefit.title}
                </h3>
                <p className='text-gray-600'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Din reise til drømmekjolen
            </h2>
            <p className='text-lg text-gray-600'>
              Slik foregår prosessen fra første kontakt til din store dag
            </p>
          </div>

          <div className='relative'>
            <div className='absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-rose-200'></div>

            <div className='space-y-12'>
              {[
                {
                  step: '1',
                  title: 'Book prøvetime',
                  description:
                    'Velg tjeneste, dato og tid som passer deg best.',
                  time: '5 min',
                },
                {
                  step: '2',
                  title: 'Privat konsultasjon',
                  description:
                    'Møt din personlige stylist og diskuter ønsker og stil.',
                  time: '30 min',
                },
                {
                  step: '3',
                  title: 'Prøv kjoler',
                  description:
                    'Prøv nøye utvalgte kjoler i vårt private prøverom.',
                  time: '90 min',
                },
                {
                  step: '4',
                  title: 'Perfekt tilpasning',
                  description: 'Profesjonell tilpasning for optimal passform.',
                  time: '4-6 uker',
                },
                {
                  step: '5',
                  title: 'Din store dag',
                  description: 'Motta din perfekt tilpassede drømmekjole.',
                  time: 'Livet!',
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'
                    }`}
                  >
                    <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
                      <div className='text-sm text-rose-600 font-medium mb-1'>
                        Steg {step.step}
                      </div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {step.title}
                      </h3>
                      <p className='text-gray-600 mb-3'>{step.description}</p>
                      <div className='text-sm text-gray-500'>
                        ⏰ {step.time}
                      </div>
                    </div>
                  </div>

                  <div className='relative z-10'>
                    <div className='w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                      {step.step}
                    </div>
                  </div>

                  <div className='w-1/2'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className='py-20 bg-gradient-to-r from-cream to-rose-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='bg-white rounded-2xl p-8 lg:p-12 shadow-xl'>
            <div className='text-5xl mb-6'>⭐⭐⭐⭐⭐</div>
            <blockquote className='text-xl lg:text-2xl text-gray-700 mb-6 italic'>
              &ldquo;Den mest fantastiske opplevelsen! Kristin og teamet gjorde
              alt perfekt. Jeg følte meg som en prinsesse fra første sekund.
              Tusen takk for en uforglemmelig dag!&rdquo;
            </blockquote>
            <div className='font-semibold text-gray-900'>
              - Maria, bride 2024
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function BookingPage(props: BookingPageProps) {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <main className='min-h-screen bg-gradient-to-b from-cream to-white flex items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600'></div>
          </main>
        }
      >
        <BookingContent {...props} />
      </Suspense>
    </ProtectedRoute>
  )
}
