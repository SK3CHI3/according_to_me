import { NextResponse } from 'next/server'

let thoughts = [
  { id: '1', text: "Social media algorithms are shaping our reality.", author: "FutureThinker" },
  { id: '2', text: "We need more critical thinking in our digital interactions.", author: "DigitalCritic" },
  { id: '3', text: "The line between virtual and real is blurring every day.", author: "VirtualRealist" },
]

export async function GET() {
  try {
    // Simulate a potential error condition (remove this in production)
    if (Math.random() < 0.2) {
      throw new Error('Random error occurred')
    }

    return NextResponse.json(thoughts)
  } catch (error) {
    console.error('Error in GET /api/thoughts:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json()
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }
    const newThought = {
      id: Date.now().toString(),
      text,
      author: "Anonymous" // In a real app, this would be the authenticated user
    }
    thoughts.push(newThought)
    return NextResponse.json(newThought, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/thoughts:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

