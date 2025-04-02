# GOAL DIGGER

A career guidance website using the Ikigai method and interactive questionnaires for students.

## Accessing the Website

The website is available at: [https://goal-digger.vercel.app](https://goal-digger.vercel.app)

### For Students (6th to 10th Grade)

- Visit the website
- Click on "Fun Questionnaire"
- Answer the questions to discover your interests and potential career paths

### For Students (11th Grade and Above)

- Visit the website
- Click on "Ikigai Method"
- Complete the questionnaire to find your purpose and ideal career path

## For Developers

If you want to run the website locally:

1. Install Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Double-click `start.bat` to start the development server
3. Open `open.html` in your browser to access the website

## Features

- Age-appropriate questionnaires
- Interactive UI
- Career guidance based on the Ikigai method
- Personalized results and recommendations

## Support

If you encounter any issues or have questions, please contact the website administrator.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/ShravniJehurkar/goal-digger.git
   cd goal-digger
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm start
   ```

4. Open [http://localhost:4000](http://localhost:4000) in your browser

The website will run locally on your computer. You can access it by opening http://localhost:4000 in your web browser.

### Troubleshooting

If you encounter port conflicts:

```bash
# Check if port 4000 is in use
netstat -ano | findstr :4000

# Kill the process if needed
taskkill /F /PID <process_id>
```

If you see any dependency-related errors:

1. Delete the `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

## Built With

- React
- Vite
- Tailwind CSS
- React Router DOM

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/ShravniJehurkar/goal-digger/issues).

## Author

Shravni Jehurkar

- GitHub: [@ShravniJehurkar](https://github.com/ShravniJehurkar)
- LinkedIn: [@Shravni Jehurkar](https://linkedin.com/in/ShravniJehurkar/)
