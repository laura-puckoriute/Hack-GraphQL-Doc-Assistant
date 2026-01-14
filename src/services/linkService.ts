import { NexusGenObjects } from "../../nexus-typegen";

const links: NexusGenObjects["Link"][] = [
    {
        id: 1,
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL",
        dateCreated: Date.now(),
        timeCreated: Date.now(),
    },
    {
        id: 2,
        url: "graphql.org",
        description: "GraphQL official website",
        dateCreated: Date.now(),
        timeCreated: Date.now(),
    },
];

let nextId = links.length + 1;

export function getLinks(): NexusGenObjects["Link"][] {
    return links;
}

export function createLink(description: string, url: string): NexusGenObjects["Link"] {
    const ts = Date.now();
    const link = {
        id: nextId++,
        description,
        url,
        dateCreated: ts,
        timeCreated: ts,
    } satisfies NexusGenObjects["Link"];

    links.push(link);
    return link;
}
