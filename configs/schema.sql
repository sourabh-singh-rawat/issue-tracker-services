-- DATABASE
-- CREATE DATABASE "issue-tracker";
-- TRUNCATE issues, issue_tasks, issue_comments, projects, project_members;

-- drop table issue_comments, issue_priority, issue_status, 
-- issue_tasks, issues, project_members, project_status, projects, 
-- roles, users, teams, team_members;

-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   

-- TABLES
CREATE TABLE IF NOT EXISTS roles (
  code VARCHAR(20),
  message VARCHAR(20)
);
INSERT INTO roles 
VALUES ('MEMBER', 'member'), ('ADMIN', 'admin');

CREATE TABLE IF NOT EXISTS project_status (
  status VARCHAR(20) UNIQUE,
  message VARCHAR (20)
);

INSERT INTO project_status
VALUES ('0_NOT_STARTED', 'not started'), ('1_OPEN', 'open'), ('2_PAUSED', 'paused'), ('3_COMPLETED', 'completed');

CREATE TABLE IF NOT EXISTS issue_status (
  status VARCHAR(20) UNIQUE,
  message VARCHAR(20)
);

INSERT INTO issue_status 
VALUES ('0_OPEN', 'open'), ('1_IN_PROGRESS', 'in progress'), ('2_IN_REVIEW', 'in review'), ('3_CLOSED', 'closed');

CREATE TABLE IF NOT EXISTS issue_priority (
  priority VARCHAR(20) UNIQUE,
  message VARCHAR (20)
);

INSERT INTO issue_priority
VALUES ('0_LOWEST', 'lowest'), ('1_LOW', 'low'), ('2_MEDIUM', 'medium'), ('3_HIGH', 'high'), ('4_HIGHEST', 'highest');

-- users
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  uid VARCHAR(255) UNIQUE NOT NULL,
  photo_url VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
);

-- projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(60),
  description VARCHAR(4000),
  status VARCHAR(20) DEFAULT 'NOT_STARTED',
  owner_id uuid NOT NULL, --global
  owner_email VARCHAR(255),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES project_status(status),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS project_members (
    project_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role VARCHAR(20),
    creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE 
);

-- issues
CREATE TABLE IF NOT EXISTS issues (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(60),
  description VARCHAR(4000),
  status VARCHAR(20),
  priority VARCHAR(20),
  reporter_id uuid NOT NULL,
  project_id uuid NOT NULL,
  assignee_id uuid,
  team_id uuid,
  due_date TIMESTAMP,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (status) REFERENCES issue_status(status),
  FOREIGN KEY (priority) REFERENCES issue_priority(priority),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS issue_assignee (
--   issue_id uuid NOT NULL,
--   assignee_id uuid,

--   FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE CASCADE,
--   FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE
-- );


CREATE TABLE IF NOT EXISTS teams (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(60),
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  leader uuid,

  PRIMARY KEY (id),
  FOREIGN KEY (leader) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS  team_members (
    user_id uuid,
    team_id uuid,
    role INTEGER,
    
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,

    -- CONSTRAINT free_user_team_limit CHECK()
);

CREATE TABLE IF NOT EXISTS issue_comments (
  id uuid DEFAULT uuid_generate_v4(),
  description VARCHAR(4000),
  user_id uuid,
  issue_id uuid,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE issue_tasks (
  id uuid DEFAULT uuid_generate_v4(),
  issue_id uuid,
  description VARCHAR(255),
  due_date TIMESTAMP WITH TIME ZONE,
  assigned_to uuid,
  completed BOOLEAN DEFAULT false,
  creation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);