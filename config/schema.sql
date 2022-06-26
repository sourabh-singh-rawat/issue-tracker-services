-- DATABASE
CREATE DATABASE "issue-tracker";

-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   

-- TABLES
-- teams
CREATE TABLE IF NOT EXISTS teams (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  lead VARCHAR(255),

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

-- Projects
CREATE TABLE IF NOT EXISTS project_status (
  status INTEGER UNIQUE,
  message VARCHAR (20)
);

INSERT INTO project_status
VALUES (0, 'not started'), (1, 'open'), (2, 'completed'), (3, 'paused');

CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR,
  status INTEGER DEFAULT 0,
  owner_uid VARCHAR(255) NOT NULL, --global
  owner_email VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES project_status(status),
  FOREIGN KEY (owner_uid) REFERENCES users(uid)
);

-- Issues
CREATE TABLE IF NOT EXISTS issue_status (
  status INTEGER UNIQUE,
  message VARCHAR(20)
);
INSERT INTO issue_status 
VALUES (0, 'Open'), (1, 'In Progress') ,(2, 'Closed');

CREATE TABLE IF NOT EXISTS issue_priority (
  priority INTEGER UNIQUE,
  message VARCHAR (20)
);
INSERT INTO issue_priority
VALUES (0, 'lowest'), (1, 'low'), (2, 'medium'), (3, 'high'), (4, 'highest');

CREATE TABLE IF NOT EXISTS issues (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR(255),
  status INTEGER,
  priority INTEGER,
  reporter VARCHAR(255) NOT NULL,
  assigned_to VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP,
  project_id uuid,
  team_id uuid,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES issue_status(status),
  FOREIGN KEY (priority) REFERENCES issue_priority(priority),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assigned_to) REFERENCES users(uid)
);

-- project members
CREATE TABLE IF NOT EXISTS project_members (
    project_id uuid,
    user_id VARCHAR(255),
    role VARCHAR(255),

    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(uid),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- team members
CREATE TABLE IF NOT EXISTS  team_members (
    user_id VARCHAR(255),
    team_id uuid,
    role VARCHAR (255),
    
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES users(uid),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);
