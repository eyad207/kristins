import { Metadata } from 'next'
import AuthForm from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'Logg inn - Kristins Kjoledrømmer',
  description:
    'Logg inn for å booke prøvetimer og administrere dine bestillinger.',
}

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Logg inn på din konto
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Eller{' '}
            <span className='font-medium text-rose-600'>
              registrer deg for å booke prøvetime
            </span>
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
