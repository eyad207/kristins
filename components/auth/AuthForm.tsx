'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Loader, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'E-post er påkrevd'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ugyldig e-postadresse'
    }

    if (!formData.password) {
      newErrors.password = 'Passord er påkrevd'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Passord må være minst 6 tegn'
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Navn er påkrevd'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passordene stemmer ikke overens'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      let result
      if (isLogin) {
        result = await login(formData.email, formData.password)
      } else {
        result = await register(
          formData.name,
          formData.email,
          formData.password
        )
      }

      if (result.success) {
        router.push(redirectTo)
      } else {
        setErrors({ submit: result.error || 'En feil oppstod' })
      }
    } catch {
      setErrors({ submit: 'En uventet feil oppstod' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Fjern feil når bruker begynner å skrive
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setErrors({})
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
      <form className='space-y-6' onSubmit={handleSubmit}>
        {/* Global Error */}
        {errors.submit && (
          <div className='flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md'>
            <AlertCircle className='h-5 w-5 text-red-600' />
            <span className='text-sm text-red-600'>{errors.submit}</span>
          </div>
        )}

        {/* Name Field (Only for Register) */}
        {!isLogin && (
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Fullt navn
            </label>
            <div className='mt-1'>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                value={formData.name}
                onChange={handleInputChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } rounded-md placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm`}
                placeholder='Skriv inn ditt fulle navn'
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
              )}
            </div>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            E-postadresse
          </label>
          <div className='mt-1'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              value={formData.email}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-md placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm`}
              placeholder='din@epost.no'
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Passord
          </label>
          <div className='mt-1 relative'>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={formData.password}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 pr-10 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } rounded-md placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm`}
              placeholder='Minimum 6 tegn'
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5 text-gray-400' />
              ) : (
                <Eye className='h-5 w-5 text-gray-400' />
              )}
            </button>
            {errors.password && (
              <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
            )}
          </div>
        </div>

        {/* Confirm Password Field (Only for Register) */}
        {!isLogin && (
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700'
            >
              Bekreft passord
            </label>
            <div className='mt-1'>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='new-password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } rounded-md placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm`}
                placeholder='Gjenta passordet'
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <Button
            type='submit'
            disabled={loading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <>
                <Loader className='animate-spin -ml-1 mr-3 h-5 w-5' />
                {isLogin ? 'Logger inn...' : 'Registrerer...'}
              </>
            ) : (
              <>{isLogin ? 'Logg inn' : 'Registrer deg'}</>
            )}
          </Button>
        </div>

        {/* Toggle Between Login/Register */}
        <div className='text-center'>
          <button
            type='button'
            onClick={toggleMode}
            className='text-sm text-rose-600 hover:text-rose-500'
          >
            {isLogin
              ? 'Har du ikke en konto? Registrer deg her'
              : 'Har du allerede en konto? Logg inn her'}
          </button>
        </div>
      </form>

      {/* Demo Credentials */}
      <div className='mt-6 p-4 bg-gray-50 rounded-md'>
        <h4 className='text-sm font-medium text-gray-900 mb-2'>
          Demo innlogginger:
        </h4>
        <div className='space-y-1 text-sm text-gray-600'>
          <p>
            <strong>Admin:</strong> admin@kristins.no / admin123
          </p>
          <p>
            <strong>Kunde:</strong> kunde@eksempel.no / kunde123
          </p>
        </div>
      </div>
    </div>
  )
}
