import { extendType, nonNull, objectType, stringArg } from "nexus";
import { createLink, getLinks } from "../services/linkService";
import { validateLinkInput, LinkInput } from "../services/linkValidationService";

export const Link = objectType({
    name: "Link",
    definition(t) { 
        t.nonNull.int("id"); 
        t.nonNull.string("description");
        t.nonNull.string("url");
        t.nonNull.float("dateCreated");
        t.nonNull.float("timeCreated");
    },
});

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                return getLinks();
            },
        });
    },
});

export const LinkMutation = extendType({
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {
            type: "Link",  
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },

            validate: async (root: any, args: LinkInput) => {
                await validateLinkInput(args);
            },

            resolve(parent, args: LinkInput, context) {
                const { description, url } = args;

                return createLink(description, url);
            },
        });
    },
});