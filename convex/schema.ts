import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  users: defineTable({
    firstName: s.string(),
    lastName: s.string(),
    email: s.string(),
    profilePic: s.string(), // url
    tokenIdentifier: s.string(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  applications: defineTable({
    title: s.string(),
    adminFields: s.array(
      s.union(
        s.object({
          name: s.string(),
          type: s.literal("shortText"),
          maxLength: s.number(),
        }),
        s.object({
          name: s.string(),
          type: s.literal("multiSelect"),
          options: s.array(s.string()),
        }),
        s.object({
          name: s.string(),
          type: s.literal("longText"),
          wordLimit: s.number(),
        }),
        s.object({
          name: s.string(),
          type: s.literal("multipleChoice"),
          options: s.array(s.string()),
        }),
        s.object({
          name: s.string(),
          type: s.literal("checkbox"), // single checkbox
        }),
        s.object({
          name: s.string(),
          type: s.literal("upload"),
        })
      )
    ),
    steps: s.array(
      s.object({
        name: s.string(),
        fields: s.array(
          s.union(
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("shortText"),
              maxLength: s.number(),
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("multiSelect"),
              options: s.array(s.string()),
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("longText"),
              wordLimit: s.number(),
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("multipleChoice"),
              options: s.array(s.string()),
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("checkbox"),
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("upload"),
            })
          )
        ),
      })
    ),
  }),
  submissions: defineTable({
    user: s.id("users"),
    application: s.id("applications"),
    submitted: s.boolean(),
    fields: s.map(
      s.string(),
      s.union(s.string(), s.boolean(), s.array(s.string()))
    ),
  }).index("by_userAndApplication", ["user", "application"]),
  admins: defineTable({
    userId: s.id("users"),
    application: s.id("applications"),
  }),
  notes: defineTable({
    submissionId: s.string(),
    userId: s.string(),
    noteContents: s.string(),
  }),
});
