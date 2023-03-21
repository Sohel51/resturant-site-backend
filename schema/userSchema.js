const userSchema = new mongoose.Schema({
    username: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    }
  });

  const userModel = mongoose.model('Users Model', userSchema);