'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAdmin: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users - i produksjon ville dette vært en database
const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@kristins.no',
    name: 'Kristin Admin',
    role: 'admin',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b512-6b4f?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'customer-1',
    email: 'kunde@eksempel.no',
    name: 'Test Kunde',
    role: 'customer',
    createdAt: '2024-03-15T10:30:00Z',
  },
]

// Mock passwords - i produksjon ville dette vært hashed
const mockPasswords: Record<string, string> = {
  'admin@kristins.no': 'admin123',
  'kunde@eksempel.no': 'kunde123',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Sjekk om bruker er logget inn fra localStorage
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch {
        localStorage.removeItem('auth_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)

    // Simuler API kall
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Sjekk om bruker finnes
      const foundUser = mockUsers.find((u) => u.email === email)

      if (!foundUser) {
        return { success: false, error: 'Ugyldig e-post eller passord' }
      }

      // Sjekk passord
      if (mockPasswords[email] !== password) {
        return { success: false, error: 'Ugyldig e-post eller passord' }
      }

      // Sett bruker som innlogget
      setUser(foundUser)
      localStorage.setItem('auth_user', JSON.stringify(foundUser))

      return { success: true }
    } catch {
      return { success: false, error: 'En feil oppstod under innlogging' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)

    // Simuler API kall
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Sjekk om bruker allerede finnes
      if (mockUsers.find((u) => u.email === email)) {
        return {
          success: false,
          error: 'En bruker med denne e-posten finnes allerede',
        }
      }

      // Opprett ny bruker
      const newUser: User = {
        id: `customer-${Date.now()}`,
        email,
        name,
        role: 'customer',
        createdAt: new Date().toISOString(),
      }

      // Legg til i mock data (i produksjon ville dette vært lagret i database)
      mockUsers.push(newUser)
      mockPasswords[email] = password

      // Logg inn automatisk
      setUser(newUser)
      localStorage.setItem('auth_user', JSON.stringify(newUser))

      return { success: true }
    } catch {
      return { success: false, error: 'En feil oppstod under registrering' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    router.push('/')
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth må brukes innenfor AuthProvider')
  }
  return context
}
