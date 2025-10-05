# Contributing to DevCircle

First off, thank you for considering contributing to DevCircle! It's people like you that make DevCircle such a great tool for college coding communities.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if relevant**
* **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/React style guide
* Include thoughtful comments in your code
* End all files with a newline
* Write clear commit messages
* Update documentation as needed

## Development Process

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install` in both `client/` and `server/`
3. Make your changes
4. Test your changes thoroughly
5. Ensure the code follows the existing style
6. Make sure TypeScript compiles without errors
7. Update the README.md if needed
8. Create a Pull Request

## Style Guide

### TypeScript

* Use TypeScript for all new files
* Follow existing naming conventions
* Use interfaces for data structures
* Properly type all functions and variables

### React

* Use functional components with hooks
* Keep components small and focused
* Use meaningful component and variable names
* Follow the existing component structure

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

## Project Structure

Please maintain the existing project structure:

```
client/
  src/
    components/    # Reusable UI components
    context/       # React context providers
    pages/         # Page components
    types/         # TypeScript type definitions
    utils/         # Utility functions

server/
  controllers/     # Request handlers
  middleware/      # Express middleware
  models/          # Mongoose models
  repositories/    # Database operations
  routes/          # API routes
  services/        # Business logic
  utils/           # Utility functions
```

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing! 🎉
