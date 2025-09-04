import { resend, EMAIL_CONFIG, EMAIL_TEMPLATES } from '@/lib/email'
import BookingConfirmationEmail from '@/emails/booking-confirmation'

export interface EmailData {
  customerName: string
  customerEmail: string
  serviceName: string
  servicePrice: number
  appointmentDate: string
  appointmentTime: string
  staffName: string
  notes?: string
  appointmentId: string
}

export class EmailService {
  static async sendBookingConfirmation(data: EmailData) {
    try {
      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: data.customerEmail,
        reply_to: EMAIL_CONFIG.replyTo,
        subject: EMAIL_TEMPLATES.booking_confirmation.subject,
        react: BookingConfirmationEmail({
          customerName: data.customerName,
          serviceName: data.serviceName,
          servicePrice: data.servicePrice,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          staffName: data.staffName,
          notes: data.notes,
        }),
      })

      // Send kopi til admin
      await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: EMAIL_CONFIG.adminEmail,
        reply_to: EMAIL_CONFIG.replyTo,
        subject: `Ny booking: ${data.customerName} - ${data.serviceName}`,
        react: BookingConfirmationEmail({
          customerName: data.customerName,
          serviceName: data.serviceName,
          servicePrice: data.servicePrice,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          staffName: data.staffName,
          notes: data.notes,
        }),
      })

      return { success: true, emailId: result.data?.id }
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error)
      throw new Error('Failed to send booking confirmation email')
    }
  }

  static async sendBookingReminder(data: EmailData) {
    try {
      const reminderTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f3f4f6;">
            <h1 style="color: #c4a484; font-size: 28px; margin: 0;">Kristins Brudesalong</h1>
            <p style="color: #6b7280; font-size: 16px;">Påminnelse om prøvetime</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #111827; font-size: 24px;">Hei ${data.customerName}! 👋</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Dette er en påminnelse om din prøvetime i morgen:
            </p>
            
            <div style="background-color: #fef7f0; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #c4a484; margin-top: 0;">📅 Timedetaljer</h3>
              <p><strong>Tjeneste:</strong> ${data.serviceName}</p>
              <p><strong>Dato:</strong> ${data.appointmentDate}</p>
              <p><strong>Tid:</strong> ${data.appointmentTime}</p>
              <p><strong>Stilist:</strong> ${data.staffName}</p>
            </div>
            
            <p style="color: #6b7280;">
              Vi gleder oss til å møte deg! Hvis du har spørsmål, ikke nøl med å kontakte oss.
            </p>
          </div>
        </div>
      `

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: data.customerEmail,
        reply_to: EMAIL_CONFIG.replyTo,
        subject: EMAIL_TEMPLATES.booking_reminder.subject,
        html: reminderTemplate,
      })

      return { success: true, emailId: result.data?.id }
    } catch (error) {
      console.error('Failed to send booking reminder email:', error)
      throw new Error('Failed to send booking reminder email')
    }
  }

  static async sendCancellationConfirmation(data: EmailData) {
    try {
      const cancellationTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f3f4f6;">
            <h1 style="color: #c4a484; font-size: 28px; margin: 0;">Kristins Brudesalong</h1>
            <p style="color: #6b7280; font-size: 16px;">Avbestilling bekreftet</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #111827; font-size: 24px;">Hei ${data.customerName}!</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Din prøvetime er nå avbestilt som ønsket:
            </p>
            
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin-top: 0;">❌ Avbestilt time</h3>
              <p><strong>Tjeneste:</strong> ${data.serviceName}</p>
              <p><strong>Opprinnelig dato:</strong> ${data.appointmentDate}</p>
              <p><strong>Opprinnelig tid:</strong> ${data.appointmentTime}</p>
            </div>
            
            <p style="color: #6b7280;">
              Hvis du ønsker å bestille en ny time, kan du gjøre det på vår nettside. 
              Vi håper å se deg snart!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/booking" 
                 style="background-color: #c4a484; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
                Book ny time
              </a>
            </div>
          </div>
        </div>
      `

      const result = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: data.customerEmail,
        reply_to: EMAIL_CONFIG.replyTo,
        subject: EMAIL_TEMPLATES.booking_cancelled.subject,
        html: cancellationTemplate,
      })

      return { success: true, emailId: result.data?.id }
    } catch (error) {
      console.error('Failed to send cancellation confirmation email:', error)
      throw new Error('Failed to send cancellation confirmation email')
    }
  }
}
