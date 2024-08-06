const User = require('../models/user');
const Groq = require('groq-sdk');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }); // Simplified, use hashed passwords in real apps
    if (user.password === password) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received register request', req.body);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Both fields are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Error while registering', error);
    res.status(500).json({ message: 'Server error' });
  }
};

async function getGroqChatCompletion(search) {
  const groq = new Groq({ apiKey: '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' });
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Give paragraph on most intresting facts of${search}`,
      },
    ],
    model: "llama3-8b-8192",
  });

  // Extract and format the response content into an array
  const content = response.choices[0]?.message?.content || "";
  const points = content.split('\n').filter(point => point.trim() !== "");

  return points;
}

const search = async (req, res) => {
  console.log(req.body);
  try {
    const pointsArray = await getGroqChatCompletion(req.body.search);
    res.status(200).json({ data: pointsArray });
  } catch (error) {
    res.status(500).json({ error: "Error occurred while processing the request" });
  }
};

module.exports = { login, register, search };
