DROP TABLE IF EXISTS user_profiles;
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  photo_url TEXT,
  default_workspace_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);