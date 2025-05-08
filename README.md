
# Supabase Notes Service

This project implements a minimal notes service using Supabase for backend storage and authentication.

## Setup & Deployment

1. Create a new Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Run the SQL in `functions/schema.sql` in the Supabase SQL Editor
3. Deploy the Edge Functions using the Supabase CLI:
   ```bash
   # Install Supabase CLI if you haven't already
   npm install -g @supabase/cli
   
   # Login to Supabase
   supabase login
   
   # Link to your project
   supabase link --project-ref your-project-id
   
   # Deploy the functions
   supabase functions deploy get_notes
   supabase functions deploy post_notes
   ```

## Schema Design Choices

- **UUID Primary Key**: Using UUID instead of serial integers provides better security and distribution when sharding.
- **TEXT for content**: Unlimited length for note content, unlike VARCHAR which requires a length limit.
- **Default title**: Makes the UX better by providing a default for untitled notes.
- **Timestamps with timezone**: Ensures consistent datetime handling across different user locations.
- **Row Level Security (RLS)**: Implemented at the database level to ensure users can only access their own notes.
- **Indexing**: Added an index on user_id for faster queries when fetching a user's notes.

## API Endpoints

### GET /notes

Retrieves all notes for the authenticated user.

```bash
# Example curl command
curl -X GET 'https://your-project-ref.functions.supabase.co/get_notes' \
  -H 'Authorization: Bearer YOUR_AUTH_TOKEN'

# Sample response
{
  "notes": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "user_id": "auth0|user123",
      "title": "Meeting Notes",
      "content": "Discussed project timeline and deliverables",
      "created_at": "2023-05-08T12:34:56.789Z",
      "updated_at": "2023-05-08T12:34:56.789Z"
    },
    ...
  ]
}
```

### POST /notes

Creates a new note for the authenticated user.

```bash
# Example curl command
curl -X POST 'https://your-project-ref.functions.supabase.co/post_notes' \
  -H 'Authorization: Bearer YOUR_AUTH_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"title": "Shopping List", "content": "Milk, Eggs, Bread"}'

# Sample response
{
  "note": {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "user_id": "auth0|user123",
    "title": "Shopping List",
    "content": "Milk, Eggs, Bread",
    "created_at": "2023-05-08T14:22:33.444Z",
    "updated_at": "2023-05-08T14:22:33.444Z"
  }
}
```

## Frontend Integration

The frontend is built with React and TypeScript, using a clean, minimal design that's responsive and user-friendly. The application includes:

1. A sidebar listing all notes
2. A main editor area for viewing and editing notes
3. Create, read, update, and delete functionality for notes
4. Toast notifications for user feedback

The frontend currently uses mock data but is designed to easily integrate with the Supabase backend once connected.
