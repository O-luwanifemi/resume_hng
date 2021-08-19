import response from "../Utils/response.js";
import { User } from "../Model/userSchema.js";
import { sendMail } from "../Utils/emailSender.js";

const postController = {
  sendMessage: async (req, res) => {
    try {
      // Check if all inputs are not empty
      if (![req.body.name, req.body.email, req.body.message].every(Boolean)) {
        return response(res, 400, "Hey! Please fill all fields.");
      }

      // Get inputs from fields
      const { name: sender, email, message } = req.body;
      // Check if sender already exists (by email)
      const user = await User.findOne({ email });

      // If user doesn't already exist, create message, and send mail
      if (!user) {
        const mailerFeedback = await sendMail(sender, email, message);
        
        if (Object.keys(mailerFeedback).length) {
          await User.create({ sender, email, message });

          return response(
            res, 200, "Thank you for reaching out, your message has been sent."
          );
        } else throw new Error();
      }
      
      // If user exists, push to found user's message array, and send mail
      user.message.push(message);

      const mailerFeedback = await sendMail(sender, email, message);

      if (Object.keys(mailerFeedback).length) {
        await User.findByIdAndUpdate(
          { _id: user._id },
          { message: user.message }
        );

        return response(res, 200, "Thank you for reaching out, your message has been sent.");
      } else throw new Error();
    } catch (error) {
      return response(res, 500, error.message, error);
    }
  } 
}

export default postController;