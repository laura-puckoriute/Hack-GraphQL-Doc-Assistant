import * as yup from "yup";

const authorSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email format"),
});

export type AuthorInput = {
    name: string;
    email: string;
};

export async function validateAuthorInput(input: AuthorInput): Promise<void> {
    await authorSchema.validate(input);
}
