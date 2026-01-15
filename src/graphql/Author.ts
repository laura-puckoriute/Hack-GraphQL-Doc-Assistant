import { arg, extendType, inputObjectType, list, nonNull, objectType, stringArg } from "nexus";
import { getAuthors, createAuthor } from "../services/authorService";
import { validateAuthorInput } from "../services/validation/authorValidationService";
import type { AuthorInput } from "../services/validation/authorValidationService";
import { validateLinkInput } from "../services/validation/linkValidationService";
import type { LinkInput } from "../services/validation/linkValidationService";

export const LinkCreateInput = inputObjectType({
    name: "LinkCreateInput",
    definition(t) {
        t.nonNull.string("description");
        t.nonNull.string("url");
    },
});

export const Author = objectType({
    name: "Author",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.list.nonNull.field("links", { type: "Link" });
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
                links: nonNull(list(nonNull(arg({ type: LinkCreateInput })))),
            },
            validate: async (root: any, args: AuthorInput & { links: LinkInput[] }) => {
                await validateAuthorInput(args);
                await Promise.all(args.links.map(link => validateLinkInput(link)));
            },
            resolve(parent, args: AuthorInput & { links: LinkInput[] }, context) {
                const { name, email, links } = args;
                return createAuthor(name, email, links);
            },
        });
    },
});
