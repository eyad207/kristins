import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontakt oss - Kristins Brudesalong',
  description:
    'Ta kontakt med Kristins Brudesalong. Vi er her for å hjelpe deg med spørsmål om brudekjoler, booking av prøvetimer og alt annet.',
}

const contactMethods = [
  {
    icon: Phone,
    title: 'Ring oss',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
    description: 'Snakk direkte med våre eksperter',
  },
  {
    icon: Mail,
    title: 'Send e-post',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    description: 'Vi svarer innen 24 timer',
  },
  {
    icon: MapPin,
    title: 'Besøk oss',
    value: CONTACT_INFO.address,
    href: 'https://maps.google.com/?q=Bogstadveien+123+Oslo',
    description: 'Kom innom for en uforpliktende prat',
  },
]

const openingHours = [
  { day: 'Mandag - Fredag', hours: '10:00 - 18:00' },
  { day: 'Lørdag', hours: '10:00 - 16:00' },
  { day: 'Søndag', hours: 'Kun etter avtale' },
]

const socialMedia = [
  {
    name: 'Instagram',
    handle: CONTACT_INFO.instagram,
    href: `https://instagram.com/${CONTACT_INFO.instagram.replace('@', '')}`,
    icon: Instagram,
    description: 'Se våre nyeste kjoler og inspirasjon',
  },
  {
    name: 'Facebook',
    handle: CONTACT_INFO.facebook,
    href: `https://facebook.com/${CONTACT_INFO.facebook}`,
    icon: Facebook,
    description: 'Følg våre nyheter og arrangementer',
  },
]

const faqs = [
  {
    q: 'Hvordan booker jeg en prøvetime?',
    a: 'Du kan booke online via vårt bookingsystem, ringe oss direkte, eller sende en e-post. Vi anbefaler å booke minst 2 uker i forveien.',
  },
  {
    q: 'Hva koster en prøvetime?',
    a: 'En privat prøvetime koster fra 1.500 kr og inkluderer 2 timer med personlig stylist, champagne og godteri.',
  },
  {
    q: 'Kan jeg ta med følge?',
    a: 'Absolutt! Du kan ta med inntil 3 personer til prøvetimen. Vi anbefaler å ta med de som betyr mest for deg.',
  },
  {
    q: 'Hvor lang tid tar tilpasning?',
    a: 'Tilpasning tar vanligvis 4-6 uker, avhengig av hvor mye som må gjøres. Vi gir alltid en realistisk tidsplan ved bestilling.',
  },
  {
    q: 'Tilbyr dere finansiering?',
    a: 'Ja, vi har flere betalingsløsninger inkludert avdragsordninger. Kontakt oss for å diskutere mulighetene.',
  },
]

export default function KontaktPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-b from-cream to-white py-24'>
        <div className='absolute inset-0 bg-[url("/images/BACKGROUNDIMG1.avif")] bg-cover bg-center opacity-10'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6'>
            Kontakt
            <span className='block text-rose-600'>Oss</span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Vi er her for å hjelpe deg med alt fra spørsmål om våre tjenester
            til booking av din perfekte prøvetime.
          </p>
          <Button size='lg' asChild>
            <Link href='/booking'>Book prøvetime</Link>
          </Button>
        </div>
      </section>

      {/* Contact Methods */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Flere måter å nå oss på
            </h2>
            <p className='text-lg text-gray-600'>
              Velg den metoden som passer deg best
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <a
                  key={index}
                  href={method.href}
                  className='group bg-white border border-gray-200 rounded-2xl p-8 text-center hover:border-rose-300 hover:shadow-lg transition-all duration-300'
                >
                  <div className='w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-200 transition-colors duration-300'>
                    <IconComponent className='w-8 h-8 text-rose-600' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {method.title}
                  </h3>
                  <p className='text-rose-600 font-medium mb-2'>
                    {method.value}
                  </p>
                  <p className='text-gray-600 text-sm'>{method.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Opening Hours & Location */}
      <section className='py-20 bg-gradient-to-b from-white to-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Opening Hours */}
            <div>
              <div className='flex items-center mb-6'>
                <Clock className='w-6 h-6 text-rose-600 mr-3' />
                <h2 className='text-2xl font-serif font-bold text-gray-900'>
                  Åpningstider
                </h2>
              </div>
              <div className='bg-white rounded-2xl p-8 shadow-lg'>
                <div className='space-y-4'>
                  {openingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0'
                    >
                      <span className='font-medium text-gray-900'>
                        {schedule.day}
                      </span>
                      <span className='text-gray-600'>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className='mt-6 p-4 bg-rose-50 rounded-lg'>
                  <p className='text-sm text-rose-700'>
                    <strong>Tips:</strong> Prøvetimer kan også bookes utenom
                    ordinære åpningstider etter avtale.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className='text-2xl font-serif font-bold text-gray-900 mb-6'>
                Følg oss på sosiale medier
              </h2>
              <div className='space-y-4'>
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'
                    >
                      <div className='w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-rose-200 transition-colors duration-300'>
                        <IconComponent className='w-6 h-6 text-rose-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-300'>
                          {social.name}
                        </h3>
                        <p className='text-rose-600 text-sm font-medium'>
                          {social.handle}
                        </p>
                        <p className='text-gray-600 text-sm'>
                          {social.description}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Finn oss
            </h2>
            <p className='text-lg text-gray-600'>
              Vi ligger sentralt på Bogstadveien i Oslo
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <div className='bg-gradient-to-r from-rose-50 to-cream rounded-2xl p-8'>
                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                  Enkel å finne
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-start space-x-3'>
                    <MapPin className='w-5 h-5 text-rose-600 mt-1' />
                    <div>
                      <p className='font-medium text-gray-900'>Adresse:</p>
                      <p className='text-gray-600'>{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3'>
                    <svg
                      className='w-5 h-5 text-rose-600 mt-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4 2a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 14v-1h6v1H5zm6-3H5V9h6v4zm0-6H5V5h6v2z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <p className='font-medium text-gray-900'>Parkering:</p>
                      <p className='text-gray-600'>
                        Gateløsning og parkeringshus i nærheten
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3'>
                    <svg
                      className='w-5 h-5 text-rose-600 mt-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <p className='font-medium text-gray-900'>Kollektivt:</p>
                      <p className='text-gray-600'>
                        5 min gange fra Majorstuen T-bane
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='aspect-[4/3] rounded-2xl overflow-hidden shadow-xl'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.1234567890123!2d10.7234567!3d59.9234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDU1JzI0LjUiTiAxMMKwNDMnMjQuNSJF!5e0!3m2!1sen!2sno!4v1234567890123!5m2!1sen!2sno'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Kristins Brudesalong lokasjon'
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-gradient-to-b from-white to-cream'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Ofte stilte spørsmål
            </h2>
            <p className='text-lg text-gray-600'>
              Svar på de vanligste spørsmålene vi får
            </p>
          </div>

          <div className='space-y-6'>
            {faqs.map((faq, index) => (
              <div key={index} className='bg-white rounded-2xl p-6 shadow-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  {faq.q}
                </h3>
                <p className='text-gray-600'>{faq.a}</p>
              </div>
            ))}
          </div>

          <div className='text-center mt-12'>
            <p className='text-gray-600 mb-4'>
              Fant du ikke svar på spørsmålet ditt?
            </p>
            <Button variant='outline' asChild>
              <Link href={`mailto:${CONTACT_INFO.email}`}>
                Send oss en e-post
              </Link>
            </Button>
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
            Vi gleder oss til å høre fra deg og hjelpe deg med å finne din
            drømmekjole.
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
              <Link href={`tel:${CONTACT_INFO.phone}`}>Ring oss nå</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
