import { defineSchema, defineTable, s } from "convex/schema";

// TODO: delete these (example data)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleApplication = {
  title: "WDB Application",
  adminFields: [
    {
      name: "Application Stage",
      type: "multiSelect",
      options: ["Interviewing", "Accepted", "Rejected"]
    }
  ],
  steps: [
    {
      name: "Personal Information",
      fields: [
        {
          name: "First Name", // table header in admin view
          title: "First name", // title in application form
          description: "", // description in application form
          type: "shortText",
          maxLength: 14
        },
        {
          name: "Essay #1",
          title: "Why do you want to join WDB?",
          description: "Use 250 words or less.",
          type: "longText",
          wordLimit: 250
        }
      ]
    },
    {
      name: "Branch Preferences",
      fields: [
        {
          name: "Branch Preference",
          title: "Which branch do you prefer?",
          description: "Select all that apply.",
          type: "multiSelect",
          options: ["Industry", "Bootcamp", "Design"]
        }
      ]
    }
  ]
};

// for the submissions table:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exampleSubmission = {
  user: "325h2pojfds", // user id
  application: "3lhnl253", // application id
  submitted: true,
  fields: {
    "First Name": "Anish",
    "Essay #1": "alwkejhlkajgh",
    "Application Stage": "Accepted",
    "Branch Preference": ["Industry", "Design", "Bootcamp"]
  }
};

export default defineSchema({
  // table for users
  users: defineTable({
    firstName: s.string(),
    lastName: s.string(),
    // TODO: find out how to protect against malicious input from the user
    email: s.string(),
    isAdmin: s.boolean(),
    profilePic: s.string(), // url
    tokenIdentifier: s.string() // TODO: add index on this field
  }).index("by_tokenIdentifier", ["tokenIdentifier"]), // TODO clarify whether this is the desired behavior
  applications: defineTable({
    title: s.string(),
    adminFields: s.array(
      s.union(
        s.object({
          name: s.string(),
          type: s.literal("shortText"),
          maxLength: s.number()
        }),
        s.object({
          name: s.string(),
          type: s.literal("multiSelect"),
          options: s.array(s.string())
        }),
        s.object({
          name: s.string(),
          type: s.literal("longText")
        }),
        s.object({
          name: s.string(),
          type: s.literal("multipleChoice"),
          options: s.array(s.string())
        }),
        s.object({
          name: s.string(),
          type: s.literal("checkbox") // single checkbox
        }),
        s.object({
          name: s.string(),
          type: s.literal("upload")
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
              maxLength: s.number()
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("multiSelect"),
              options: s.array(s.string())
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("longText"),
              wordLimit: s.number()
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("multipleChoice"),
              options: s.array(s.string())
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("checkbox") // single checkbox
            }),
            s.object({
              name: s.string(),
              title: s.string(),
              description: s.string(),
              type: s.literal("upload")
            })
          )
        )
      })
    )
  }),
  submissions: defineTable({
    user: s.id("users"),
    application: s.id("applications"),
    submitted: s.boolean(),
    fields: s.map(
      s.string(),
      s.union(s.string(), s.boolean(), s.array(s.string()))
    )
  })
});
