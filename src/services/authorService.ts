import { GraphQLError } from "graphql";
import { NexusGenObjects } from "../../nexus-typegen";
import { createLink, exists } from "./linkService";
import type { LinkInput } from "./validation/linkValidationService";

const authors: NexusGenObjects["Author"][] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        links: [
            {
                id: 1,
                url: "www.howtographql.com",
                description: "Fullstack tutorial for GraphQL",
                dateCreated: Date.now(),
                timeCreated: Date.now(),
            },
        ],
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        links: [
            {
                id: 2,
                url: "graphql.org",
                description: "GraphQL official website",
                dateCreated: Date.now(),
                timeCreated: Date.now(),
            },
        ],
    },
];

export function getAuthors(): NexusGenObjects["Author"][] {
    return authors;
}

export function getAuthor(id: number): NexusGenObjects["Author"] | undefined {
    return authors.find(author => author.id === id);
}

export function createAuthor(
    name: string,
    email: string,
    linksInput: LinkInput[] = []
): NexusGenObjects["Author"] {
    if (linksInput.length > 3) {
        throw new GraphQLError("Cannot create more than 3 links per author.");
    }

    const uniqueUrls = new Set<string>();
    linksInput.forEach(link => {
        if (uniqueUrls.has(link.url)) {
            throw new GraphQLError("Duplicate link URL in request.");
        }
        uniqueUrls.add(link.url);
        exists(link.url);
    });

    const links = linksInput.map(link => createLink(link.description, link.url));

    const newAuthor: NexusGenObjects["Author"] = {
        id: authors.length + 1,
        name,
        email,
        links,
    };
    authors.push(newAuthor);
    return newAuthor;
}
