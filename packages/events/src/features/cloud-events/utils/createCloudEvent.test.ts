import { describe, expect, it } from "vitest";
import { createCloudEvent } from "./createCloudEvent";
import { isCloudEvent, validateCloudEvent } from "./validateCloudEvent";

describe("createCloudEvent", () => {
  it("fills defaults for id, specversion, time, and datacontenttype", () => {
    const event = createCloudEvent({
      type: "user.registered",
      source: "pine/identity-service",
      data: { userId: "u-1", email: "a@b.com" },
    });

    expect(event.specversion).toBe("1.0");
    expect(event.type).toBe("user.registered");
    expect(event.source).toBe("pine/identity-service");
    expect(event.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(event.time).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(event.datacontenttype).toBe("application/json");
    expect(event.data).toEqual({ userId: "u-1", email: "a@b.com" });
  });

  it("respects explicit overrides", () => {
    const event = createCloudEvent({
      id: "fixed-id",
      type: "project.created",
      source: "pine/issues-service",
      time: "2020-01-01T00:00:00.000Z",
      subject: "project/abc",
      datacontenttype: "application/cloudevents+json",
      dataschema: "https://example.com/schemas/project.json",
      data: { id: "p-1" },
    });

    expect(event).toEqual({
      id: "fixed-id",
      type: "project.created",
      source: "pine/issues-service",
      specversion: "1.0",
      time: "2020-01-01T00:00:00.000Z",
      subject: "project/abc",
      datacontenttype: "application/cloudevents+json",
      dataschema: "https://example.com/schemas/project.json",
      data: { id: "p-1" },
    });
  });

  it("accepts Date for time and omits data defaults when data is absent", () => {
    const event = createCloudEvent({
      type: "workspace.created",
      source: "pine/issues-service",
      time: new Date("2021-06-15T12:00:00.000Z"),
    });

    expect(event.time).toBe("2021-06-15T12:00:00.000Z");
    expect(event.data).toBeUndefined();
    expect(event.datacontenttype).toBeUndefined();
  });

  it("round-trips create → validate", () => {
    const created = createCloudEvent({
      type: "workspace.member-invited",
      source: "pine/issues-service",
      data: {
        userId: "u-1",
        workspaceId: "w-1",
        email: "a@b.com",
      },
    });

    expect(validateCloudEvent(created)).toEqual(created);
    expect(isCloudEvent(created)).toBe(true);
  });
});
