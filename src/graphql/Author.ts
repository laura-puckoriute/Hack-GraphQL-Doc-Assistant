import { extendType, nonNull, objectType, stringArg } from "nexus";
import { getAuthors, createAuthor } from "../services/authorService";
import { validateAuthorInput, AuthorInput } from "../services/validation/authorValidationService";

export const Author = objectType({
    name: "Author",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.field("link", { type: "Link" });
    },
});

export const AuthorQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("authors", {
            type: "Author",
            resolve(parent, args, context, info) {
                return getAuthors();
            },
        });
    },
});

export const AuthorMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createAuthor", {
            type: "Author",
            args: {
                name: nonNull(stringArg()),
                email: nonNull(stringArg()),
            },
            validate: async (root: any, args: AuthorInput) => {
                await validateAuthorInput(args);
            },
            resolve(parent, args: AuthorInput, context) {
                const { name, email } = args;
                // Create a default link for the author
                const defaultLink = {
                    id: 0,
                    url: "",
                    description: "",
                    dateCreated: Date.now(),
                    timeCreated: Date.now(),
                };
                return createAuthor(name, email, defaultLink);
            },
        });
    },
});
