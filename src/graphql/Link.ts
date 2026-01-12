import { extendType, nonNull, objectType, stringArg } from "nexus";
import { createLink, getLinks } from "../services/linkService";
import { validateLinkInput } from "../services/linkValidationService";

export const Link = objectType({
    name: "Link", // 1 
    definition(t) {  // 2
        t.nonNull.int("id"); // 3 
        t.nonNull.string("description"); // 4
        t.nonNull.string("url"); // 5 
    },
});


export const LinkQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {   // 3
            type: "Link",
            resolve(parent, args, context, info) {    // 4
                return getLinks();
            },
        });
    },
});

export const LinkMutation = extendType({  // 1
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Link",  
            args: {   // 3
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },

            validate: async (root, args) => {
                await validateLinkInput(args);
            },
            
            resolve(parent, args, context) {
                const { description, url } = args;  // 4

                return createLink(description, url);
            },
        });
    },
});