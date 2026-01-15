import * as yup from "yup";

const linkSchema = yup.object({
    description: yup
        .string()
        .required("Description is required")
        .min(5, "Description is too short")
        .max(255, "Description is too long"),
    url: yup
        .string()
        .required("URL is required")
        .url("Must be a valid URL format"),
});

export type LinkInput = {
    description: string;
    url: string;
};

export async function validateLinkInput(input: LinkInput): Promise<void> {
    await linkSchema.validate(input);
}
