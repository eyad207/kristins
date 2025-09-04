import React from 'react'

interface BookingConfirmationEmailProps {
  customerName: string
  serviceName: string
  servicePrice: number
  appointmentDate: string
  appointmentTime: string
  staffName: string
  notes?: string
}

export default function BookingConfirmationEmail({
  customerName,
  serviceName,
  servicePrice,
  appointmentDate,
  appointmentTime,
  staffName,
  notes,
}: BookingConfirmationEmailProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px 0',
          borderBottom: '2px solid #f3f4f6',
        }}
      >
        <h1 style={{ color: '#c4a484', fontSize: '28px', margin: '0' }}>
          Kristins Brudesalong
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', margin: '10px 0 0 0' }}>
          Din drømmedag begynner her
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '30px 20px' }}>
        <h2
          style={{ color: '#111827', fontSize: '24px', marginBottom: '20px' }}
        >
          Hei {customerName}! 👋
        </h2>

        <p
          style={{
            color: '#374151',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}
        >
          Takk for at du valgte Kristins Brudesalong! Vi gleder oss til å møte
          deg og hjelpe deg med å finne den perfekte brudekjolen.
        </p>

        <div
          style={{
            backgroundColor: '#fef7f0',
            border: '1px solid #fed7aa',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px',
          }}
        >
          <h3
            style={{
              color: '#c4a484',
              fontSize: '18px',
              marginBottom: '15px',
              marginTop: '0',
            }}
          >
            📅 Dine timedetaljer
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td
                style={{
                  padding: '8px 0',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Tjeneste:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {serviceName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 0',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Dato:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {appointmentDate}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 0',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Tid:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {appointmentTime}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 0',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Stilist:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {staffName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '8px 0',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Pris:
              </td>
              <td style={{ padding: '8px 0', color: '#6b7280' }}>
                {servicePrice.toLocaleString('no-NO')} kr
              </td>
            </tr>
          </table>

          {notes && (
            <div
              style={{
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid #fed7aa',
              }}
            >
              <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                <strong>Notater:</strong> {notes}
              </p>
            </div>
          )}
        </div>

        <div
          style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px',
          }}
        >
          <h3
            style={{
              color: '#0369a1',
              fontSize: '18px',
              marginBottom: '10px',
              marginTop: '0',
            }}
          >
            💡 Forberedelser til prøvetimen
          </h3>
          <ul style={{ color: '#374151', margin: '0', paddingLeft: '20px' }}>
            <li>Kom gjerne med inspirasjon og bilder av kjoler du liker</li>
            <li>Ta med undervannstøy du planlegger å bruke på bryllupsdagen</li>
            <li>
              Bruk sko med omtrent samme hælhøyde som du vil ha på bryllupet
            </li>
            <li>Sett av god tid - vi ønsker ikke å stresse!</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/booking/cancel?id=APPOINTMENT_ID`}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              margin: '0 10px',
            }}
          >
            Avbestill time
          </a>
        </div>

        <p
          style={{
            color: '#6b7280',
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '20px',
          }}
        >
          Har du spørsmål før timen? Ikke nøl med å kontakte oss på telefon
          eller e-post. Vi er her for å hjelpe!
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          padding: '25px 20px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#c4a484',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0 0 10px 0',
          }}
        >
          Kristins Brudesalong
        </p>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0' }}>
          Bogstadveien 123, 0366 Oslo
        </p>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0' }}>
          📞 +47 123 45 678 | 📧 post@kristins-brudesalong.no
        </p>
        <div style={{ marginTop: '15px' }}>
          <a
            href='#'
            style={{
              color: '#c4a484',
              textDecoration: 'none',
              margin: '0 10px',
            }}
          >
            Instagram
          </a>
          <a
            href='#'
            style={{
              color: '#c4a484',
              textDecoration: 'none',
              margin: '0 10px',
            }}
          >
            Facebook
          </a>
          <a
            href='#'
            style={{
              color: '#c4a484',
              textDecoration: 'none',
              margin: '0 10px',
            }}
          >
            Pinterest
          </a>
        </div>
      </div>
    </div>
  )
}
