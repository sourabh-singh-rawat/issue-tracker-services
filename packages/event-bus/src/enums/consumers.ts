export const CONSUMERS = {
  USER_CREATED_CONSUMER_ISSUE_TRACKER: "user-created-consumer-issue-tracker",
  USER_UPDATED_CONSUMER_ISSUE_TRACKER: "user-updated-consumer-issue-tracker",
  EMAIL_CREATED_CONSUMER_AUTH: "email-created-consumer-auth",
} as const;

export type Consumers = (typeof CONSUMERS)[keyof typeof CONSUMERS];
