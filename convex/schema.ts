import { defineSchema, defineTable, s } from "convex/schema";

// TODO: delete
const data = {
  id: "3lhnl253",
  title: "WDB Application",
  fields: {
    "First Name": {
      type: "shortText",
      adminOnly: false,
    },
    "Application Stage": {
      type: "multiSelect",
      adminOnly: true,
      extraInfo: {
        options: ["Interviewing", "Accepted", "Rejected"],
      },
    },
    // other fields
  },
};

// for the submissions table:
const b = {
  user: "325h2pojfds", // user id
  application: "3lhnl253", // application id
  submitted: true,
  fields: {
    "First Name": "Anish",
    "Application Stage": "Accepted",
  },
};

export default defineSchema({
  // table for users
  users: defineTable({
    firstName: s.string(),
    lastName: s.string(),
    // TODO: https://docs.convex.dev/api/interfaces/server.UserIdentity#email
    // TODO: find out how to protect against malicious input from the user
    email: s.string(),
    isAdmin: s.boolean(),
    // TODO: find out if this should be a URL or not and WHERE we need to store
    // TODO:  the actual pictures
    profilePic: s.string(),
    // TODO: find out whether this solves the uniqueness problem or not
    // TODO s.id(???), HOW DO WE MAKE SURE IT'S UNIQUE
    // does convex make it unique by default?
    tokenIdentifier: s.string(), // TODO: or s.id("users")
  }),
  //
  applications: defineTable({
    // TODO: clarify how ids for the table within a table work
    id: s.id("applications"),
    title: s.string(),
    // TODO: are applications connected to users or not?
    user: s.id("users"),
    fields: s.map(
      s.string(),
      s.union(
        s.object({
          type: s.literal("shortText"),
          adminOnly: s.boolean(),
          maxLength: s.number(),
        }),
        s.object({
          type: s.literal("multiSelect"),
          adminOnly: s.boolean(),
          options: s.array(s.string()),
        }),
        s.object({
          type: s.literal("longText"),
          adminOnly: s.boolean(),
          maxLength: s.number(),
        }),
        s.object({
          type: s.literal("multipleChoice"),
          adminOnly: s.boolean(),
          options: s.array(s.string()),
        }),
        s.object({
          type: s.literal("checkbox"),
          adminOnly: s.boolean(),
          options: s.array(s.string()),
        }),
        s.object({
          type: s.literal("upload"),
          adminOnly: s.boolean(),
          url: s.string(),
        })
      )
    ),
  }),
  //
  submissions: defineTable({
    user: s.id("users"),
    application: s.id("applications"),
    submitted: s.boolean(),
    // TODO clarify the EXACT fields structure and their types
    fields: s.array(
      s.object({
        name: s.string(),
        value: s.string(),
        adminOnly: s.boolean(),
      })
    ),
  }),
});
