# Contributing to DyslexiaFont.org

Thank you for your interest in contributing to DyslexiaFont.org! This project aims to help people with dyslexia discover their optimal reading configuration.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](../../issues) to avoid duplicates
2. Use the bug report template
3. Include:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Check existing issues for similar suggestions
2. Use the feature request template
3. Explain the problem you're trying to solve
4. Describe your proposed solution

### Code Contributions

#### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dyslexiafont.org.git
cd dyslexiafont.org/app

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Development Guidelines

- **TypeScript**: All code should be TypeScript
- **Formatting**: Use Prettier (configured in the project)
- **Components**: React functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Accessibility**: WCAG 2.1 AA compliance minimum

#### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`npm run lint`)
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

#### Commit Message Format

```
type(scope): description

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(testing): add new rating component`
- `fix(font): correct letter spacing calculation`
- `docs(readme): update installation instructions`

### Adding Reading Passages

Reading passages should:
- Be 50-100 words
- Match the target reading level (3rd, 5th, or 8th grade)
- Be culturally neutral
- Avoid sensitive topics (see project plan Section A.1)

Add passages to `lib/passages/passageBank.ts`.

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Please read it before participating.

## Questions?

Open a discussion or reach out to the maintainers.

Thank you for helping make reading more accessible! 📚
