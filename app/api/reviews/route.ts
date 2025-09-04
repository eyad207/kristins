import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/database/connection'
import { Review } from '@/lib/models'

export async function GET() {
  try {
    await connectDB()

    // Get published reviews only, sorted by rating and date
    const reviews = await Review.find({ published: true })
      .sort({ rating: -1, createdAt: -1 })
      .limit(20)
      .lean()

    return NextResponse.json({
      success: true,
      data: reviews,
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved henting av anmeldelser' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, rating, title, reviewBody, images } = body

    // Validate required fields
    if (!userId || !rating || !title || !reviewBody) {
      return NextResponse.json(
        { success: false, error: 'Alle påkrevde felt må fylles ut' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Vurdering må være mellom 1 og 5' },
        { status: 400 }
      )
    }

    await connectDB()

    // Create review (unpublished by default)
    const review = await Review.create({
      userId: userId,
      rating: rating,
      title: title.trim(),
      body: reviewBody.trim(),
      published: false, // Admin must approve
      images: images || [],
    })

    return NextResponse.json(
      {
        success: true,
        data: review,
        message: 'Anmeldelse sendt inn for godkjenning',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Feil ved opprettelse av anmeldelse' },
      { status: 500 }
    )
  }
}
