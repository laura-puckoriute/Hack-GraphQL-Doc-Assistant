# Schema Validation Reference

## Link
| field | data type | validations |
| --- | --- | --- |
| dateCreated | Float! | Non-null; server generated timestamp |
| description | String! | Non-null; on creation must be provided; length between 5 and 255 characters |
| id | Int! | Non-null; no additional constraints |
| timeCreated | Float! | Non-null; server generated timestamp |
| url | String! | Non-null; on creation must be provided; must be a valid URL format; must be unique |

## Mutation.post Arguments
| field | data type | validations |
| --- | --- | --- |
| description | String! | Required; length between 5 and 255 characters |
| url | String! | Required; must be a valid URL format; must be unique |

## Query
| field | data type | validations |
| --- | --- | --- |
| authors | [Author!]! | Non-null list of authors; no input validation |
| feed | [Link!]! | Non-null list of links; no input validation |

## Author
| field | data type | validations |
| --- | --- | --- |
| email | String! | Non-null; should be email format |
| id | Int! | Non-null; no additional constraints |
| link | Link! | Non-null; references Link type |
| name | String! | Non-null; no additional constraints |

## Mutation.createAuthor Arguments
| field | data type | validations |
| --- | --- | --- |
| email | String! | Required; no additional constraints |
| name | String! | Required; no additional constraints |
