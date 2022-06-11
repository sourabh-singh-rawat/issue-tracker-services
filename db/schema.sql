-- DATABASE
CREATE DATABASE "issue-tracker";

-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   

-- TABLES
-- teams
CREATE TABLE IF NOT EXISTS teams (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id)
);


-- users
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  uid VARCHAR(255) UNIQUE NOT NULL, -- global
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  team_id uuid,

  PRIMARY KEY (id),
  FOREIGN KEY (team_id) REFERENCES teams (id)
);

-- project
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR,
  status VARCHAR(25),
  owner_uid VARCHAR(255), --global
  owner_email VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (owner_uid) REFERENCES users(uid),
  FOREIGN KEY (owner_email) REFERENCES users(email)
);

-- issues
CREATE TABLE IF NOT EXISTS issues (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR(255),
  status VARCHAR(50),
  priority VARCHAR(50),
  reporter VARCHAR(255),
  assigned_to VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP,
  project_id uuid,
  team_id uuid,

  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assigned_to) REFERENCES users(uid)
);