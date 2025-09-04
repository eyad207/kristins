import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { validateEmail, validatePhone } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Alle påkrevde felt må fylles ut' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Ugyldig e-postadresse' },
        { status: 400 }
      )
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Ugyldig telefonnummer' },
        { status: 400 }
      )
    }

    // TODO: Send email using Resend API
    // TODO: Save contact form submission to database
    // TODO: Send auto-reply to customer

    console.log('Contact form submission:', {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: 'Takk for din henvendelse! Vi kontakter deg snart.',
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved sending av melding' },
      { status: 500 }
    )
  }
}
