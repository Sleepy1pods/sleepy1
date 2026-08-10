import express from 'express'
import type { Request, Response } from 'express'
import { Resend } from 'resend'

const router = express.Router()

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Graceful fallback if Resend is not yet configured
    console.warn('[Newsletter] RESEND_API_KEY not set — skipping email send.')
    return res.json({ success: true, message: 'Subscribed successfully (email delivery pending API key).' })
  }

  const resend = new Resend(apiKey)
  // For Resend free tier without a verified domain, you MUST use onboarding@resend.dev
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  try {
    console.log(`[Newsletter] Attempting to send email to: ${email} from: ${fromAddress}`);
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: '🛌 Welcome to Sleepy1 — Your First Rest is Free!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Welcome to Sleepy1</title>
        </head>
        <body style="margin:0;padding:0;background-color:#090a10;font-family:'Inter',Arial,sans-serif;color:#e8eaf0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#090a10;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#12141c 0%,#1a1c2e 100%);border-radius:24px;overflow:hidden;border:1px solid rgba(139,155,251,0.2);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#8b9bfb 0%,#6366f1 100%);padding:40px;text-align:center;">
                      <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.15em;">SLEEPY1</h1>
                      <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);letter-spacing:0.1em;text-transform:uppercase;">Your Pod. Your Mode.</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#f0f1fa;">
                        Welcome aboard, Rester! 🌙
                      </h2>
                      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(224,226,244,0.75);">
                        You've just joined the most forward-thinking rest community in India. Whether you're a student pulling an all-nighter, a traveller between flights, or a professional needing a mid-day reset — <strong style="color:#e8eaf0;">Sleepy1 is your sanctuary</strong>.
                      </p>

                      <!-- Highlight box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(139,155,251,0.08);border:1px solid rgba(139,155,251,0.25);border-radius:16px;margin-bottom:28px;">
                        <tr>
                          <td style="padding:24px;">
                            <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#8b9bfb;">Your Welcome Gift</p>
                            <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#ffffff;">₹100 Free Credits</p>
                            <p style="margin:0;font-size:13px;color:rgba(224,226,244,0.6);">Automatically added when you verify your account. Use code <strong style="color:#8b9bfb;font-family:monospace;">WELCOME-REST100</strong> at checkout.</p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:rgba(224,226,244,0.75);">
                        As a newsletter member, you'll be the first to hear about:
                      </p>

                      <ul style="margin:0 0 28px;padding:0 0 0 20px;font-size:14px;line-height:1.8;color:rgba(224,226,244,0.7);">
                        <li>New pod locations launching near you</li>
                        <li>Exclusive sleep credits & promo offers</li>
                        <li>Early access to membership plans</li>
                        <li>Wellness tips from our sleep experts</li>
                      </ul>

                      <!-- CTA -->
                      <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
                        <tr>
                          <td style="background:linear-gradient(135deg,#8b9bfb 0%,#6366f1 100%);border-radius:50px;padding:0;">
                            <a href="https://sleepy1pods.com" style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.05em;">Book Your First Rest →</a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(224,226,244,0.45);text-align:center;">
                        Rest well. You deserve it. 🌟
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.08);">
                      <p style="margin:0;font-size:11px;color:rgba(224,226,244,0.35);text-align:center;">
                        © 2026 Sleepy1 · IIIT Dharwad Research Park · 
                        <a href="mailto:sleepy1.pods@gmail.com" style="color:rgba(139,155,251,0.7);text-decoration:none;">sleepy1.pods@gmail.com</a>
                        <br/><br/>
                        You received this because you subscribed at sleepy1pods.com. 
                        No spam, ever.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    console.log('[Newsletter] Resend API Response -> Data:', JSON.stringify(data), 'Error:', JSON.stringify(error));

    if (error) {
      console.error('[Newsletter] Resend API explicit error:', error);
      return res.status(500).json({ success: false, message: 'Failed to send welcome email. ' + (error.message || '') })
    }

    return res.json({ success: true, message: 'Welcome email sent!' })
  } catch (err: unknown) {
    console.error('[Newsletter] Resend error:', err)
    return res.status(500).json({ success: false, message: 'Failed to send welcome email. Please try again.' })
  }
})

export default router
