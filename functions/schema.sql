
-- This is the schema for our notes table in Supabase

CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Note',
  content TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure we can quickly fetch notes for a specific user
  CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add an index on user_id for faster queries
CREATE INDEX notes_user_id_idx ON notes (user_id);

-- Set up RLS (Row Level Security) to ensure users can only access their own notes
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policy for selecting notes - users can only see their own notes
CREATE POLICY notes_select_policy ON notes 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for inserting notes - users can only create notes for themselves
CREATE POLICY notes_insert_policy ON notes 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for updating notes - users can only update their own notes
CREATE POLICY notes_update_policy ON notes 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for deleting notes - users can only delete their own notes
CREATE POLICY notes_delete_policy ON notes 
  FOR DELETE USING (auth.uid() = user_id);
