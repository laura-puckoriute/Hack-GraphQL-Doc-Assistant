import * as yup from "yup";
import type { LinkInput } from "./linkValidationService";

const authorSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email format"),
    links: yup
        .array()
        .of(
            yup.object({
                description: yup
                    .string()
                    .required("Link description is required")
                    .min(5, "Description is too short")
                    .max(255, "Description is too long"),
                url: yup
                    .string()
                    .required("Link URL is required")
                    .url("Must be a valid URL format"),
            })
        )
        .max(3, "Cannot create more than 3 links per author")
        .default([])
        .optional(),
});

export type AuthorInput = {
    name: string;
    email: string;
    links: LinkInput[];
};

export async function validateAuthorInput(input: AuthorInput): Promise<void> {
    await authorSchema.validate(input);
}
