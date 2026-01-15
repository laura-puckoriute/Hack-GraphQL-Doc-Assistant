import { NexusGenObjects } from "../../nexus-typegen";

const authors: NexusGenObjects["Author"][] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        link: {
            id: 1,
            url: "www.howtographql.com",
            description: "Fullstack tutorial for GraphQL",
            dateCreated: Date.now(),
            timeCreated: Date.now(),
        },
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        link: {
            id: 2,
            url: "graphql.org",
            description: "GraphQL official website",
            dateCreated: Date.now(),
            timeCreated: Date.now(),
        },
    },
];

export function getAuthors(): NexusGenObjects["Author"][] {
    return authors;
}

export function getAuthor(id: number): NexusGenObjects["Author"] | undefined {
    return authors.find(author => author.i === id);
}

export function createAuthor(
    name: string,
    email: string,
    link: NexusGenObjects["Link"]
): NexusGenObjects["Author"] {
    const newAuthor: NexusGenObjects["Author"] = {
        id: authors.length + 1,
        name,
        email,
        link,
    };
    authors.push(newAuthor);
    return newAuthor;
}
