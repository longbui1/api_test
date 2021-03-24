const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://api_blog:123321456@cluster0.jrkp5.mongodb.net/api_blog?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('connect successfully');
    } catch {
        console.log('connect failed');
    }
}

module.exports = { connect };
