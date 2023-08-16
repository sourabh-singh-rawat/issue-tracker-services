DROP TABLE IF EXISTS password_reset_tokens;
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID NOT NULL,
  token_value UUID NOT NULL,
  status TEXT NOT NULL,
  expiration_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
