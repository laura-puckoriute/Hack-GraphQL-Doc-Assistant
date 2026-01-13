# Schema Validation Reference

## Link
| field | data type | validations |
| --- | --- | --- |
| description | String! | Non-null; on creation must be provided; length between 5 and 255 characters |
| id | Int! | Non-null; no additional constraints |
| url | String! | Non-null; on creation must be provided; must be a valid URL format |

## Mutation.post Arguments
| field | data type | validations |
| --- | --- | --- |
| description | String! | Required; length between 5 and 255 characters |
| url | String! | Required; must be a valid URL format |

## Query
| field | data type | validations |
| --- | --- | --- |
| feed | [Link!]! | Non-null list of links; no input validation |
