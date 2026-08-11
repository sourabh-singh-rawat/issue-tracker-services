import { describe, expect, it, vi } from "vitest";
import { KetoAuthorizationGraphProvider } from "@/integrations/authorization/KetoAuthorizationGraphProvider";

describe("KetoAuthorizationGraphProvider", () => {
  const createProvider = () => {
    const createRelationship = vi.fn().mockResolvedValue({});
    const deleteRelationships = vi.fn().mockResolvedValue({});
    const getRelationships = vi.fn().mockResolvedValue({ data: { relation_tuples: [] } });
    const checkPermission = vi.fn().mockResolvedValue({ data: { allowed: true } });

    const keto = {
      relationshipWriteApi: {
        createRelationship,
        deleteRelationships,
      },
      relationshipReadApi: {
        getRelationships,
      },
      permissionApi: {
        checkPermission,
      },
    };

    const provider = new KetoAuthorizationGraphProvider(keto as never);

    return {
      provider,
      createRelationship,
      deleteRelationships,
      getRelationships,
      checkPermission,
    };
  };

  it("creates a relationship with subject_id", async () => {
    const { provider, createRelationship } = createProvider();

    await provider.createRelationship({
      object: { type: "role", id: "role-1" },
      relation: "assignee",
      subject: { type: "user", id: "user-1" },
    });

    expect(createRelationship).toHaveBeenCalledWith({
      createRelationshipBody: {
        namespace: "role",
        object: "role-1",
        relation: "assignee",
        subject_id: "user:user-1",
      },
    });
  });

  it("creates a relationship with subject_set", async () => {
    const { provider, createRelationship } = createProvider();

    await provider.createRelationship({
      object: { type: "capability", id: "authorization:role:create" },
      relation: "has",
      subjectSet: { type: "role", id: "role-1", relation: "assignee" },
    });

    expect(createRelationship).toHaveBeenCalledWith({
      createRelationshipBody: {
        namespace: "capability",
        object: "authorization:role:create",
        relation: "has",
        subject_set: {
          namespace: "role",
          object: "role-1",
          relation: "assignee",
        },
      },
    });
  });

  it("deletes a relationship with subject_set query params", async () => {
    const { provider, deleteRelationships } = createProvider();

    await provider.deleteRelationship({
      object: { type: "capability", id: "authorization:role:create" },
      relation: "has",
      subjectSet: { type: "role", id: "role-1", relation: "assignee" },
    });

    expect(deleteRelationships).toHaveBeenCalledWith({
      namespace: "capability",
      object: "authorization:role:create",
      relation: "has",
      subjectSetNamespace: "role",
      subjectSetObject: "role-1",
      subjectSetRelation: "assignee",
    });
  });

  it("lists relationships filtered by subject set and maps subject_set responses", async () => {
    const { provider, getRelationships } = createProvider();
    getRelationships.mockResolvedValue({
      data: {
        relation_tuples: [
          {
            namespace: "capability",
            object: "authorization:role:create",
            relation: "has",
            subject_set: {
              namespace: "role",
              object: "role-1",
              relation: "assignee",
            },
          },
        ],
      },
    });

    const results = await provider.listRelationships({
      object: { type: "capability", id: "authorization:role:create" },
      relation: "has",
      subjectSet: { type: "role", id: "role-1", relation: "assignee" },
    });

    expect(getRelationships).toHaveBeenCalledWith({
      namespace: "capability",
      object: "authorization:role:create",
      relation: "has",
      subjectId: undefined,
      subjectSetNamespace: "role",
      subjectSetObject: "role-1",
      subjectSetRelation: "assignee",
    });

    expect(results).toEqual([
      {
        object: { type: "capability", id: "authorization:role:create" },
        relation: "has",
        subjectSet: { type: "role", id: "role-1", relation: "assignee" },
      },
    ]);
  });

  it("rejects relationships with neither subject nor subjectSet", async () => {
    const { provider } = createProvider();

    await expect(
      provider.createRelationship({
        object: { type: "role", id: "role-1" },
        relation: "assignee",
      }),
    ).rejects.toThrow("exactly one of subject or subjectSet");
  });

  it("rejects list filters with both subject and subjectSet", async () => {
    const { provider } = createProvider();

    await expect(
      provider.listRelationships({
        subject: { type: "user", id: "user-1" },
        subjectSet: { type: "role", id: "role-1", relation: "assignee" },
      }),
    ).rejects.toThrow("must not set both subject and subjectSet");
  });
});
