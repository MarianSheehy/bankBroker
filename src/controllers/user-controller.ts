import type { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";
import { userStore } from "../models/mongo/user-store.js";
import bcrypt from "bcryptjs";
import { validatePasswordRules } from "../utils/password-rules.js";

export const userController = {
  index: {
    handler: async (request: Request, h: ResponseToolkit) => {
      const user = request.auth.credentials as any;
      return h.view("user-view", {
        title: "User settings",
        active: "account", // matches id="account" in the navbar
        user,
      });
    },
  },

  changePassword: {
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const authUser = request.auth.credentials as any;
        const userId = authUser._id.toString();

        const { currentPassword, newPassword, confirmPassword } =
          request.payload as {
            currentPassword: string;
            newPassword: string;
            confirmPassword: string;
          };

        // 1. Basic presence validation
        if (!currentPassword || !newPassword || !confirmPassword) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "All password fields are required",
          });
        }

        // 2. Confirm new passwords match
        if (newPassword !== confirmPassword) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "New passwords do not match",
          });
        }

        // 3. Password rules: minimum length
        if (newPassword.length < 8) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "New password must be at least 8 characters long",
          });
        }

        const ruleError = validatePasswordRules(newPassword);
        if (ruleError) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: ruleError,
          });
        }

        // 4. Password rules: at least one letter and one number
        const hasLetter = /[A-Za-z]/.test(newPassword);
        const hasNumber = /\d/.test(newPassword);

        if (!hasLetter || !hasNumber) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "New password must contain at least one letter and one number",
          });
        }

        // 5. Load user via store
        const user = await userStore.findOne(userId);
        if (!user) {
          return Boom.unauthorized("User not found");
        }

        if (!user.password) {
          console.error("User record missing password:", user._id);
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "Your account is missing a password hash. Please contact support.",
          });
        }

        // 6. Verify current password
        const ok = await bcrypt.compare(currentPassword, user.password);
        if (!ok) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "Current password is incorrect",
          });
        }

        // 7. Prevent reusing the same password (optional but recommended)
        const sameAsOld = await bcrypt.compare(newPassword, user.password);
        if (sameAsOld) {
          return h.view("user-view", {
            title: "User settings",
            active: "account",
            user: authUser,
            error: "New password must be different from the current password",
          });
        }

        // 8. Hash and save new password
        const saltRounds = 12;
        const newHash = await bcrypt.hash(newPassword, saltRounds);

        await userStore.updatePassword(userId, newHash);

        return h.view("user-view", {
          title: "User settings",
          active: "account",
          user: authUser,
          success: "Password updated successfully",
        });
      } catch (err) {
        console.error("Change password error:", err);
        return Boom.serverUnavailable("Failed to change password");
      }
    },
  },
};