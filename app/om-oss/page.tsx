import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Om oss - Kristins Brudesalong',
  description:
    'Møt Kristin og teamet bak Norges mest eksklusive brudesalong. Vår historie, våre verdier og vår lidenskap for å skape magiske øyeblikk.',
}

const team = [
  {
    name: 'Kristin Hansen',
    role: 'Gründer & Hoveddesigner',
    image: '/images/PROFILEIMG.avif',
    description:
      'Med over 15 års erfaring innen brudekjole-design har Kristin hjulpet over 2000 bryder med å finne sin drømmekjole.',
    specialties: ['Vintage design', 'Tilpasning', 'Brudekonsultasjon'],
  },
  {
    name: 'Maria Pedersen',
    role: 'Senior Stylist',
    image: '/images/SelectionsfromEssenseofAustraliaIMG3.avif',
    description:
      'Maria har en bakgrunn fra Parisiske atelierer og bringer internasjonal ekspertise til vårt team.',
    specialties: ['Moderne design', 'Tilbehør', 'Farge-koordinering'],
  },
  {
    name: 'Anne Larsen',
    role: 'Skredder & Tilpasningsekspert',
    image: '/images/SelectionsfromJesusPeiroIMG2.avif',
    description:
      'Anne sørger for at hver kjole passer perfekt med sitt mesterlige håndverk og øye for detaljer.',
    specialties: ['Tilpasning', 'Sømarbeider', 'Kvalitetskontroll'],
  },
]

const values = [
  {
    icon: '💎',
    title: 'Eksklusivitet',
    description:
      'Vi tilbyr kun de fineste kjolene fra verdens mest respekterte designere.',
  },
  {
    icon: '🤝',
    title: 'Personlig service',
    description:
      'Hver bride får individuell oppmerksomhet og skreddersydd service.',
  },
  {
    icon: '✨',
    title: 'Perfektion',
    description:
      'Vi streber etter perfektion i hver eneste detalj, fra prøvetime til leveranse.',
  },
  {
    icon: '💝',
    title: 'Omsorg',
    description:
      'Vi forstår hvor spesiell denne dagen er og behandler hver bride som familie.',
  },
]

const achievements = [
  { number: '2000+', label: 'Fornøyde bryder' },
  { number: '15+', label: 'Års erfaring' },
  { number: '50+', label: 'Eksklusive designere' },
  { number: '98%', label: 'Kundetilfredshet' },
]

export default function OmOssPage() {
  return (
    <main className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-b from-cream to-white py-24'>
        <div className='absolute inset-0 bg-[url("/images/BACKGROUNDIMG1.avif")] bg-cover bg-center opacity-10'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h1 className='text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6'>
                Vår
                <span className='block text-rose-600'>Historie</span>
              </h1>
              <p className='text-xl text-gray-600 mb-8'>
                Siden 2008 har Kristins Brudesalong vært Norges foretrukne
                destinasjon for bryder som søker eksklusivitet, kvalitet og
                uforglemmelig service.
              </p>
              <Button size='lg' asChild>
                <Link href='/booking'>Møt oss</Link>
              </Button>
            </div>
            <div className='relative'>
              <div className='aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl'>
                <Image
                  src='/images/PROFILEIMG.avif'
                  alt='Kristin Hansen - Gründer'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-6'>
              Fra drøm til virkelighet
            </h2>
            <div className='prose prose-lg mx-auto text-gray-600'>
              <p>
                Det hele begynte med en drøm. Kristin Hansen, en ung kvinne med
                passion for design og et øye for perfektion, så et behov for en
                brudesalong som ikke bare solgte kjoler, men skapte opplevelser.
              </p>
              <p>
                I 2008 åpnet hun dørene til sin første salong i hjertet av Oslo.
                Med bare fem kjoler og et ønske om å gjøre hver brides dag
                spesiell, la hun grunnlaget for det som skulle bli Norges mest
                eksklusive brudesalong.
              </p>
              <p>
                I dag, over 15 år senere, har vi hjulpet over 2000 bryder med å
                finne sin perfekte kjole. Vi har vokst fra en liten salong til
                et komplett team av eksperter, men vår kjerne forblir den samme:
                å skape magiske øyeblikk for hver eneste bride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-20 bg-gradient-to-b from-white to-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Våre verdier
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Disse verdiene styrer alt vi gjør og hvordan vi behandler hver
              bride.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <div key={index} className='text-center group'>
                <div className='text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300'>
                  {value.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-gray-900 mb-4'>
              Møt vårt team
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Eksperter som brenner for å skape den perfekte opplevelsen for
              hver bride.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {team.map((member, index) => (
              <div key={index} className='text-center group'>
                <div className='relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-lg'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-1'>
                  {member.name}
                </h3>
                <p className='text-rose-600 font-medium mb-3'>{member.role}</p>
                <p className='text-gray-600 mb-4'>{member.description}</p>
                <div className='flex flex-wrap justify-center gap-2'>
                  {member.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className='px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm'
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className='py-20 bg-rose-600'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-serif font-bold text-white mb-4'>
              Våre resultater
            </h2>
            <p className='text-xl text-rose-100'>
              Tallene som reflekterer vårt engasjement og kvalitet.
            </p>
          </div>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {achievements.map((achievement, index) => (
              <div key={index} className='text-center'>
                <div className='text-4xl md:text-5xl font-bold text-white mb-2'>
                  {achievement.number}
                </div>
                <div className='text-rose-100 font-medium'>
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20 bg-gradient-to-b from-cream to-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-serif font-bold text-gray-900 mb-6'>
            Vår misjon
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            &ldquo;Å skape magiske øyeblikk og uforglemmelige opplevelser for
            hver bride, ved å kombinere eksklusive design med personlig service
            og genuine omsorg. Vi tror at hver kvinne fortjener å føle seg som
            en prinsesse på sin store dag.&rdquo;
          </p>
          <div className='text-gray-500 italic'>- Kristin Hansen, Gründer</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6'>
            Bli en del av vår historie
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            La oss hjelpe deg med å skrive ditt eget eventyr. Book en prøvetime
            og opplev forskjellen som personlig service og ekspert rådgivning
            kan gjøre.
          </p>
          <Button size='lg' asChild>
            <Link href='/booking'>Book din prøvetime</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
