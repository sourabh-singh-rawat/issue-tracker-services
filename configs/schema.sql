-- DATABASE
-- CREATE DATABASE "issue-tracker";

-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   

-- TABLES
-- Teams
CREATE TABLE IF NOT EXISTS teams (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  lead uuid,

  PRIMARY KEY (id)
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  uid VARCHAR(255) UNIQUE NOT NULL,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
);

-- Projects
CREATE TABLE IF NOT EXISTS project_status (
  status INTEGER UNIQUE,
  message VARCHAR (20)
);

INSERT INTO project_status
VALUES (0, 'not started'), (1, 'open'), (2, 'paused'), (3, 'completed');

CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR,
  status INTEGER DEFAULT 0,
  owner_uid uuid NOT NULL, --global
  owner_email VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES project_status(status),
  FOREIGN KEY (owner_uid) REFERENCES users(id)
);

-- Issues
CREATE TABLE IF NOT EXISTS issue_status (
  status INTEGER UNIQUE,
  message VARCHAR(20)
);

INSERT INTO issue_status 
VALUES (1, 'open'), (2, 'in progress'), (3, 'in review'), (4, 'closed');

CREATE TABLE IF NOT EXISTS issue_priority (
  priority INTEGER UNIQUE,
  message VARCHAR (20)
);

INSERT INTO issue_priority
VALUES (1, 'lowest'), (2, 'low'), (3, 'medium'), (4, 'high'), (5 'highest');

CREATE TABLE IF NOT EXISTS issues (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR(255),
  status INTEGER,
  priority INTEGER,
  reporter_id uuid NOT NULL,
  assigned_to uuid,
  project_id uuid,
  team_id uuid,
  due_date TIMESTAMP,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES issue_status(status),
  FOREIGN KEY (priority) REFERENCES issue_priority(priority),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (reporter_id) REFERENCES  users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE CASCADE
);

-- Project members
CREATE TABLE IF NOT EXISTS project_members (
    project_id uuid,
    user_id uuid,
    role INTEGER,

    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE 
);

-- Team members
CREATE TABLE IF NOT EXISTS roles (
  code INTEGER,
  message VARCHAR(20)
);
INSERT INTO roles 
VALUES (0, 'member'), (1, 'admin');

CREATE TABLE IF NOT EXISTS  team_members (
    user_id uuid,
    team_id uuid,
    role INTEGER,
    
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Issue Comments
CREATE TABLE IF NOT EXISTS issue_comments (
  id uuid DEFAULT uuid_generate_v4(),
  description VARCHAR(255),
  user_id uuid,
  issue_id uuid,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Issue Tasks
CREATE TABLE issue_tasks (
  id uuid DEFAULT uuid_generate_v4(),
  issue_id uuid,
  name VARCHAR(255),
  description VARCHAR(255),
  due_date TIMESTAMP WITH TIME ZONE,
  assigned_to uuid,
  status BOOLEAN,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);