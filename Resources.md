GitHub Custom Agent guidelines: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents
VSCode agent docs: https://code.visualstudio.com/docs/copilot/customization/custom-agents

A tutorial for initial setup: https://www.howtographql.com/typescript-apollo/3-a-simple-mutation/

TODO:
- expand the complexity of objects in the project
- add more complex validation checks (date, format, connect the objects)
- retest the flow with more complex scenarios
- test the flow with schema first APIs
- think of how to tie in the documentation writer agent, or maybe it's better to keep it separately - if there's no documentation, the agent can create it
- see how to imporve performance of the inspector agent - review the VSCode agent docs and guidelines.

- Ask the agent to check the resolvers for the type too on top of validation modules
- fix the numbering
- fix the id


Tested:
- with lower models
- we tested with other repos online
- different validation library / no library
- with different forms of documentation

Extend:
- apply to other apis or schemas
- hydration (if you don't provide something, then server populates the field itself) - update documentation/code to ensure hydration is happening or is documented clearly