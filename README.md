# Shortender

Shortender is a Nuxt.js project designed to provide URL shortening services. This README provides an overview of the project structure, installation instructions, and usage guidelines.

## Project Structure

The project consists of the following main directories and files:

- [`.gitignore`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2F.gitignore%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/.gitignore"): Git configuration to ignore specific files and directories.
- [`.npmrc`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2F.npmrc%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/.npmrc"): Configuration file for npm.
- [`nuxt.config.ts`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fnuxt.config.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/nuxt.config.ts"): Nuxt.js configuration file.
- [`package-lock.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fpackage-lock.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/package-lock.json"): Auto-generated file that locks the versions of a project's dependencies.
- [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/package.json"): Project metadata and dependencies.
- [`pnpm-lock.yaml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fpnpm-lock.yaml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/pnpm-lock.yaml"): Lockfile for pnpm dependencies.
- [`tailwind.config.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Ftailwind.config.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/tailwind.config.js"): Tailwind CSS configuration file.
- [`tsconfig.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Ftsconfig.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/tsconfig.json"): TypeScript configuration file.
- [`yarn.lock`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fyarn.lock%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/yarn.lock"): Lockfile for yarn dependencies.

### Directories

- [`.idea`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2F.idea%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/.idea"): Contains IDE-specific configurations.
- [`assets/css`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fassets%2Fcss%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/assets/css"): Contains the Tailwind CSS file.
- [`components`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fcomponents%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/components"): Contains Vue components such as `Header.vue`, `LinkItem.vue`, `Notification.vue`, and `NotificationManager.vue`.
- [`composables`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fcomposables%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/composables"): Contains custom hooks like `useExternalRedirect.ts` and `useNotification.ts`.
- [`layouts`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Flayouts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/layouts"): Contains the default layout for the application.
- [`middleware`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fmiddleware%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/middleware"): Contains authentication middleware.
- [`pages`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fpages%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/pages"): Contains the different pages of the application, including dynamic routes.
- [`public`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Fpublic%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/public"): Contains static files like `favicon.ico`.
- [`types`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fgoktugceyhan%2FDesktop%2FShortender%2Ftypes%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/goktugceyhan/Desktop/Shortender/types"): Contains TypeScript definitions for Supabase.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <repository_directory>
   ```

3. Install the dependencies:
   ```bash
   yarn install
   ```

4. Create a `.env` file in the root directory and fill in the necessary environment variables:
   ```plaintext
   APP_URL=localhost:3000
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_KEY=<your_supabase_key>
   ```

5. Start the development server:
   ```bash
   yarn start
   ```

## Usage

Once the development server is running, you can access the application in your web browser at `http://localhost:3000`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
