import { getUser, isAdmin } from "./common";
import { Document, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async (
    { db, auth },
    applicationId: string,
    // Optional parameters
    argumentsModifiers?: {
      sorting?: {
        order: "asc" | "desc";
        field: string;
      };
      filters?: {
        name: string;
        value: string | boolean | string[];
      }[];
      fieldsToInclude?: string[];
      keyword?: string;
    }
  ) => {
    const user = await getUser({ db, auth });
    if (user === null) {
      throw new Error("User does not exist in DB!");
    }

    const userIsAdmin = await isAdmin(
      db,
      user._id,
      new Id<"applications">("applications", applicationId)
    );

    if (!userIsAdmin) {
      throw new Error("User not admin for application!");
    }

    const application: Document<"applications"> | null = await db.get(
      new Id<"applications">("applications", applicationId)
    );

    if (!application) {
      throw new Error("Application does not exist");
    }

    const submissions: Document<"submissions">[] = (
      await db
        .query("submissions")
        .withIndex("by_application", (q) =>
          q.eq("application", application._id)
        )
        .collect()
    ).filter((submission) => {
      let matchesFilters = true;
      if (argumentsModifiers?.keyword) {
        const keyword = argumentsModifiers.keyword.toLowerCase();
        matchesFilters &&= Array.from(submission.fields.values()).some(
          (value) => value.toString().toLowerCase().includes(keyword)
        );
      }
      if (argumentsModifiers?.filters) {
        for (const filter of argumentsModifiers.filters) {
          matchesFilters &&=
            submission.fields.get(filter.name) === filter.value;
        }
      }
      return matchesFilters;
    });

    if (argumentsModifiers?.sorting) {
      submissions.sort((a, b) => {
        const fieldA = a.fields.get(argumentsModifiers.sorting!.field)!;
        const fieldB = b.fields.get(argumentsModifiers.sorting!.field)!;
        return (
          (argumentsModifiers.sorting!.order === "asc" ? 1 : -1) *
          fieldA.toString().localeCompare(fieldB.toString())
        );
      });
    }

    return submissions.map((submission) => {
      if (argumentsModifiers?.fieldsToInclude) {
        return {
          ...submission,
          fields: new Map(
            Array.from(submission.fields.entries()).filter(([key]) =>
              argumentsModifiers?.fieldsToInclude?.includes(key)
            )
          ),
        };
      } else {
        return submission;
      }
    });
  }
);
