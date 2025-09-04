# API Endpoints Documentation

## Overview

All API endpoints return JSON with the following structure:

```json
{
  "success": boolean,
  "data": any,
  "error": string,
  "message": string
}
```

## Services API

### GET /api/services

Returns all active services.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "deposit": number,
      "durationMin": number
    }
  ]
}
```

### POST /api/services

Creates a new service (admin only).

**Request Body:**

```json
{
  "name": "string",
  "slug": "string",
  "description": "string",
  "durationMin": number,
  "price": number,
  "deposit": number,
  "currency": "NOK",
  "category": "prøvetime"
}
```

## Availability API

### GET /api/availability

Returns available time slots for a service on a specific date.

**Query Parameters:**

- `serviceId` (required): Service ID
- `date` (required): Date in YYYY-MM-DD format
- `staffId` (optional): Specific staff member

**Response:**

```json
{
  "success": true,
  "data": {
    "date": "2025-09-15",
    "service": {
      "id": "string",
      "name": "string",
      "duration": 90
    },
    "slots": [
      {
        "start": "2025-09-15T10:00:00.000Z",
        "end": "2025-09-15T11:30:00.000Z",
        "available": true,
        "staffId": "string",
        "staffName": "string"
      }
    ]
  }
}
```

## Booking API

### POST /api/book

Creates a new appointment booking.

**Request Body:**

```json
{
  "serviceId": "string",
  "staffId": "string",
  "selectedDate": "2025-09-15",
  "selectedTime": "10:00",
  "customerName": "string",
  "customerEmail": "string",
  "customerPhone": "+4799123456",
  "notes": "string",
  "preferredStyle": "string"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "appointmentId": "string",
    "appointment": {...},
    "nextStep": "payment",
    "paymentAmount": 500,
    "paymentCurrency": "NOK"
  }
}
```

## Appointments API

### GET /api/appointments

Returns appointments based on query parameters.

**Query Parameters:**

- `email`: Customer email
- `phone`: Customer phone
- `status`: Appointment status
- `staffId`: Staff member ID
- `date`: Date in YYYY-MM-DD format

### PATCH /api/appointments?id={appointmentId}

Updates an appointment status or notes.

**Request Body:**

```json
{
  "status": "confirmed" | "cancelled" | "completed",
  "notes": "string"
}
```

## Payment APIs

### POST /api/payments/stripe

Initiates Stripe payment (placeholder).

### POST /api/payments/vipps

Initiates Vipps payment (placeholder).

## Webhook APIs

### POST /api/webhooks/stripe

Handles Stripe webhook events (placeholder).

### POST /api/webhooks/vipps

Handles Vipps webhook events (placeholder).

## Reviews API

### GET /api/reviews

Returns published reviews.

### POST /api/reviews

Submits a new review (requires approval).

**Request Body:**

```json
{
  "userId": "string",
  "rating": 1-5,
  "title": "string",
  "reviewBody": "string",
  "images": ["string"]
}
```

## Contact API

### POST /api/contact

Submits a contact form.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string"
}
```

## Testing Commands

Test services endpoint:

```bash
curl http://localhost:3000/api/services
```

Test availability endpoint:

```bash
curl "http://localhost:3000/api/availability?serviceId=SERVICE_ID&date=2025-09-15"
```

Test booking endpoint:

```bash
curl -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "SERVICE_ID",
    "staffId": "STAFF_ID",
    "selectedDate": "2025-09-15",
    "selectedTime": "10:00",
    "customerName": "Test Kunde",
    "customerEmail": "test@example.com",
    "customerPhone": "+4799123456"
  }'
```
