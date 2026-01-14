import { GraphQLError } from "graphql";
import { NexusGenObjects } from "../../nexus-typegen";

const links: NexusGenObjects["Link"][] = [
    {
        id: 1,
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL",
    },
    {
        id: 2,
        url: "graphql.org",
        description: "GraphQL official website",
    },
];

let nextId = links.length + 1;

export function getLinks(): NexusGenObjects["Link"][] {
    return links;
}

export function createLink(description: string, url: string): NexusGenObjects["Link"] {
    const link = {
        id: nextId++,
        description,
        url,
    } satisfies NexusGenObjects["Link"];

    links.push(link);
    return link;
}

export function exists(url: string){
    if(links.some(link => link.url === url)) throw new GraphQLError("URL already exists.");
}
