import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from "./graphql"; 
import { validatePlugin } from 'nexus-validate'

export const schema = makeSchema({
    types,   // 2
    plugins: [validatePlugin()],
  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    typegen: join(process.cwd(), "nexus-typegen.ts"),
  },
})