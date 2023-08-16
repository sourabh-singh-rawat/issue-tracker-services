DROP TABLE IF EXISTS email_confirmation_tokens;
CREATE TABLE IF NOT EXISTS email_confirmation_tokens(
  id UUID DEFAULT uuid_generate_v4() NOT NULL,
  sender_user_id UUID NOT NULL,
  receiver_email TEXT NOT NULL,
  token_value TEXT NOT NULL,
  status TEXT NOT NULL,
  expiration_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (sender_user_id) REFERENCES users (id)
);
