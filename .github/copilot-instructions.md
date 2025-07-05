# SDLC

Current folder structure:

```
/ (root)
├── samples/                # Example data, scripts, or reference files
├── src/                    # Source code implementation
└── sdlc/                   # SDLC-related files and folders
    ├── architecture.md     # System architecture description
    ├── vision.md           # Project vision and goals
    ├── backlog.md          # Simple tasklist backlog
    ├── user-stories/       # User stories
    └── solution-descriptions/ # Solution descriptions
```

## Software Development Lifecycle (SDLC) Process

1. **Task Added to Backlog**: New features, improvements, or bug fixes are first added as tasks to `backlog.md`.
2. **Elaboration to User Story**: Each task is elaborated into a user story and documented in the `user-stories/` folder.
3. **Solution Description**: For each user story, a solution description is written and stored in the `solution-descriptions/` folder, outlining the proposed technical approach.
4. **Cross-Check with Architecture and Vision**: Each solution is cross-checked with the current `architecture.md` and `vision.md` to ensure alignment with overall goals and system design.
5. **Test-Driven Development (TDD)**: Implementation follows TDD principles—tests are written before code, ensuring requirements are met and code is robust.
6. **Update Architecture**: At the end of the process, update `architecture.md` as needed to reflect any changes or improvements made during implementation.
7. **Documentation**: Task status is updated in `backlog.md`.
8. **Review and Merge**: git add, commit, and push changes to the repository. 

This process ensures traceability from initial idea to implementation and testing, while maintaining alignment with the project's vision and architecture.
