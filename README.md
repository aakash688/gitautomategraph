# 🌱 Git Automation Script

A powerful Node.js utility for automating Git commits and managing your GitHub contribution graph. Customize your GitHub profile with meaningful commit patterns and maintain a consistent contribution history.

## ✨ Features

- Schedule commits for past or future dates
- Create custom patterns in your contribution graph
- Control commit density for different shades of green
- Lightweight and easy to use

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Git
- GitHub account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aakash688/gitautomategraph.git
cd gitautomategraph
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure your repository**
Update the configuration in `index.js` with your repository details and desired commit pattern.

4. **Run the script**
```bash
node index.js
```

## 🛠️ Customization

### Creating Patterns
Modify the `data.json` file to create custom patterns in your contribution graph. The script supports various patterns and densities.

### Configuration Options
- `startDate`: The date from which to start making commits
- `endDate`: The end date for commits
- `commitsPerDay`: Number of commits per day (affects shade intensity)
- `pattern`: Define custom patterns for your contribution graph

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Inspired by various Git automation tools
- Built with ❤️ by Aakash Singh

## 🌐 Connect with Me

- GitHub: [aakash688](https://github.com/aakash688)
- LinkedIn: [aakashkumarsingh](https://www.linkedin.com/in/aakashkumarsingh/)


---

*Note: This tool is intended for educational purposes only. Please use it responsibly and in accordance with GitHub's Terms of Service.*
