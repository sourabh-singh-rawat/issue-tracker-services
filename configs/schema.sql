-- DATABASE
-- [x] Create database
-- CREATE DATABASE "issue-tracker";

-- [x] Create extension for uuid generation

-- Script to clear entire database
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;

-- [x] Create extension for uuid generation  
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- [ ] user_notification_types
-- [ ] user_achievement_types
-- [x] project_status_types
-- [x] project_activity_types
-- [ ] project_permission_types ?
-- [x] issue_status_types
-- [x] issue_priority_types
-- [ ] issue_activity_types
-- [ ] team_activity_types

-- Creates a table for project status types
CREATE TABLE IF NOT EXISTS project_status_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name VARCHAR(32) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO project_status_types (rank_order, name, description) 
VALUES
  (0, 'Not Started', 'Currently not started'),
  (1, 'Open', 'Currently open'),
  (2, 'Paused', 'Project paused'),
  (3, 'Completed', 'Project complete');

-- Creates a table for project activity types
CREATE TABLE IF NOT EXISTS project_activity_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name varchar(32) UNIQUE NOT NULL, 
  description varchar(255) NOT NULL,

  PRIMARY KEY (id)
);

INSERT INTO project_activity_types (rank_order, name, description)
VALUES
  (0, 'CREATED_PROJECT', 'created project'), 
  (1, 'UPDATED_PROJECT_NAME', 'updated project name'), 
  (2, 'UPDATED_PROJECT_DESCRIPTION', 'updated project description'), 
  (3, 'UPDATED_PROJECT_STATUS', 'updated project status'), 
  (4, 'UPDATED_PROJECT_START_DATE', 'updated project start date'),
  (5, 'UPDATED_PROJECT_END_DATE', 'updated project end date'),
  (6, 'CREATED_PROJECT_MEMBER', 'created project member'),
  (7, 'DELETED_PROJECT_MEMBER', 'deleted project member');

-- Creates a table for issue status types
CREATE TABLE IF NOT EXISTS issue_status_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name VARCHAR(32) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO issue_status_types (rank_order, name, description) 
VALUES
  (0, 'To Do', 'You still have to do issues'),
  (1, 'In Progress', 'Issue is currently in progress'),
  (2, 'In Review', 'Issue is In Review'),
  (3, 'Done', 'Issue is resolved and done');

-- Creates a table for issue priority types
CREATE TABLE IF NOT EXISTS issue_priority_types (
  id UUID DEFAULT uuid_generate_v4(),
  rank_order INTEGER UNIQUE NOT NULL,
  name VARCHAR(32) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO issue_priority_types (rank_order, name, description)
VALUES 
  (0, 'Lowest', 'Issue with the least priority'),
  (1, 'Low', 'Issue with low priority'),
  (2, 'Medium', 'Issue with medium priority'),
  (3, 'High', 'Issue with high priority'),
  (4, 'Highest', 'Issue with maximum priority');

-- Creates a table for proejct member roles
CREATE TABLE IF NOT EXISTS project_member_roles (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

INSERT INTO 
  project_member_roles (name, description)
VALUES
  ('admin', 'Administrator'),
  ('member', 'Member');

-- Creates a table for users
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  uid VARCHAR(255) UNIQUE NOT NULL,
  photo_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

-- Creates a table for projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) DEFAULT 'Untitled',
  description VARCHAR(4000),
  status UUID,
  owner_id UUID,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES users(id),
  FOREIGN KEY (status) REFERENCES project_status_types(id)
);

-- Creates a table for project_members
CREATE TABLE IF NOT EXISTS project_members (
  id UUID DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL,
  member_id UUID NOT NULL,
  member_role UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (member_role) REFERENCES project_member_roles(id),
  
  UNIQUE (project_id, member_id)
);

-- Creates a table for issues
CREATE TABLE IF NOT EXISTS issues (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) DEFAULT 'Untitled',
  description VARCHAR(4000),
  status UUID,
  priority UUID,
  reporter_id UUID,
  project_id UUID,
  assignee_id UUID,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (status) REFERENCES issue_status_types(id),
  FOREIGN KEY (priority) REFERENCES issue_priority_types(id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (reporter_id) REFERENCES project_members(id) ON DELETE CASCADE,
  FOREIGN KEY (assignee_id) REFERENCES project_members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS issue_tasks (
  id UUID DEFAULT uuid_generate_v4(),
  description VARCHAR(255),
  issue_id UUID,
  member_id UUID,
  completed BOOLEAN NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES project_members(id)
);

CREATE TABLE IF NOT EXISTS issue_comments (
  id UUID DEFAULT uuid_generate_v4(),
  description VARCHAR(255),
  issue_id UUID,
  member_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES project_members(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4(),
  member_role UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  PRIMARY KEY (id),
  FOREIGN KEY (member_role) REFERENCES team_member_roles(id)
);

CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  team_leader UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS issue_attachments (
  id UUID DEFAULT uuid_generate_v4(),
  bucket VARCHAR(255),
  content_type VARCHAR(255),
  full_path VARCHAR(255),
  name VARCHAR(255),
  issue_id UUID,
  size INTEGER,
  url VARCHAR(255),

  PRIMARY KEY (id),
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE
);