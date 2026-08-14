import { NextResponse } from 'next/server'
import { EmailPayload, printTerminalEmailLog } from '@/lib/emailService'

export async function POST(request: Request) {
  try {
    const payload: EmailPayload = await request.json()

    // Print prominently in server terminal console!
    printTerminalEmailLog(payload)

    return NextResponse.json({
      success: true,
      message: `Email dispatched successfully to ${payload.to}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('❌ Error dispatching email API:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
