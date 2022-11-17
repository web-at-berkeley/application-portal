import { Document, Id } from "../../../convex/_generated/dataModel";

export const application: Document<"applications"> = {
  _id: "j24tox2p4023ln" as unknown as Id<"applications">,
  _creationTime: 0,
  title: "WDB Application",
  adminFields: [
    {
      name: "In Consideration",
      type: "checkbox",
    },
    {
      name: "Bootcamp/Industry",
      type: "multipleChoice",
      options: ["Bootcamp", "Industry"],
    },
    {
      name: "Interview Score",
      type: "shortText",
      maxLength: 100,
    },
    {
      name: "Interview Notes",
      type: "longText",
      wordLimit: 300,
    },
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
          maxLength: 20,
        },
        {
          name: "Last Name",
          title: "Last name",
          description: "",
          type: "shortText",
          maxLength: 20,
        },
        {
          name: "Email",
          title: "Email",
          description: "Please use your @berkeley.edu email",
          type: "shortText",
          maxLength: 50,
        },
        {
          name: "Major(s)",
          title: "Major(s) / Intended Major(s)",
          description: "",
          type: "shortText",
          maxLength: 30,
        },
        {
          name: "Year in School",
          title: "Year in School (2022-2023 Academic Year)",
          description: "",
          type: "multipleChoice",
          options: ["First", "Second", "Third", "Fourth", "Fifth or more"],
        },
        {
          name: "Developer or Designer",
          title:
            "Would you like to apply as a developer or a designer? (Please review the requirements before making a decision)",
          description:
            "If you believe you do not meet these requirements, we highly encourage you to apply to our introduction to Fullstack Development DeCal Developer requirements: Some experience with either frontend or backend For frontend, this can look like experience with a popular frontend framework such as React, Vue, Angular, etc. For backend, this can look like experience with common backend frameworks such as Node, Django, etc. Designer requirements Some experience with designing in Figma, Adobe Creative Cloud, or any other design tools. If you are interested in both, please indicate that below and fill out the short answer questions for both roles. By applying as a developer or designer, you will be considered for both WDB’s product bootcamp and industry initiative. Unsure whether or not you meet these requirements? Contact webatberkeley@gmail.com",
          type: "multipleChoice",
          options: ["First", "Second", "Third", "Fourth", "Fifth or more"],
        },
        {
          name: "Bootcamp",
          title:
            "Would you like to be considered specifically for our bootcamp?",
          description:
            "If you do not have a lot of industry experience already, you can spend your first semester in a mentored internal project where you gain the experience needed to work in a production environment.",
          type: "checkbox",
        },
      ],
    },
    {
      name: "Questions",
      fields: [
        {
          name: "Why WDB?",
          title:
            "There are so many designer and developer opportunities on campus, why WDB?",
          description: "(150 words max)",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "Development Problem",
          title:
            "Tell us about a challenging development problem you've had in the past and how you've solved it.",
          description: "(150 words max)",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "Website with poor experience",
          title:
            "Tell us about a website or design that demonstrates poor user experience. Walk us through the process you would take to fix it.",
          description: "(150 words max)",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "Positive contribution to a team",
          title:
            "Give an example of how you made a positive contribution to a team and what the outcome was. This does not have to be development / design related. *",
          description: "(150 words max)",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "Dev/Design preference",
          title: "Which are you more comfortable / have more experience with?",
          description: "",
          type: "multipleChoice",
          options: ["Development", "Design"],
        },
        {
          name: "Development Technologies",
          title:
            "What relevant development technologies do you have experience with?",
          description:
            "(ex. React, Redux, Chakra, UI, Node, PostgreSQL, etc...)",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "Design Technologies",
          title:
            "What relevant design technologies do you have experience with?",
          description: "(ex. Figma, Adobe Illustrator, etc...)",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "Other Time Commitments",
          title: "What are your other time commitments for this semester?",
          description:
            "Please provide a rough approximation of the time per week each entails",
          type: "longText",
          wordLimit: 1500,
        },
        {
          name: "GM Time",
          title: "Confirm that you can meet our general meeting times.",
          description: "8 - 9.30 PM PST every Wednesday",
          type: "checkbox",
        },
        {
          name: "DeCal Consideration",
          title:
            "If you are not selected to be a developer/designer, would you be interested in being considered as a student for our Intrduction to Fullstack Development DeCal?",
          description: "",
          type: "multipleChoice",
          options: ["Yes", "No"],
        },
        {
          name: "Previously in Decal",
          title: "Were you previously enrolled in our DeCal?",
          description: "Introduction to Fullstack Development",
          type: "checkbox",
        },
        {
          name: "Potential Roster",
          title: "Potential Roster",
          description: "",
          type: "shortText",
          maxLength: 20,
        },
        {
          name: "Anything else",
          title: "Anything else you'd like to mention?",
          description: "",
          type: "shortText",
          maxLength: 100,
        },
      ],
    },
    {
      name: "Upload Documents",
      fields: [
        {
          name: "LinkedIn",
          title: "LinkedIn",
          description: "",
          type: "shortText",
          maxLength: 100,
        },
        {
          name: "GitHub",
          title: "GitHub",
          description: "",
          type: "shortText",
          maxLength: 100,
        },
        {
          name: "Personal Website/Portfolio",
          title: "Personal Website/Portfolio",
          description: "",
          type: "shortText",
          maxLength: 100,
        },
      ],
    },
  ],
};
