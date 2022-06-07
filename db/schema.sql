CREATE TABLE IF NOT EXISTS projects (
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  owner_uid VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  status VARCHAR(25),

  PRIMARY KEY (id),
  FOREIGN KEY (owner_uid) REFERENCES users(uid)
)