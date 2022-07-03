import { Router } from "express";
import createHttpError from "http-errors";

//-----------------------------------------------> custom imports
import { Manager } from "../models/index.js";
import { signAccessToken } from "../helpers/jwt_helper.js";
import Validator from "../helpers/validator.js";

const router = Router();

//-----------------------------------------------> Auth
router.post("/auth/register", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!Validator.isEmail(email) || !Validator.isPassword(password)) {
      throw createHttpError.BadRequest("Invalid username or password");
    }

    const doesExist = await Manager.findOne({ email });
    if (doesExist) {
      throw createHttpError.Conflict(`${email} already exist`);
    }


    const manager = new Manager({
      name, email, password
    });
    const token = signAccessToken(manager.id);

    manager.tokens.push(token);
    await manager.save();


    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
});

// login
router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!Validator.isEmail(email) || !Validator.isPassword(password)) {
      throw createHttpError.BadRequest("Invalid username or password");
    }

    const manager = await Manager.findOne({ email });
    if (!manager) {
      throw createHttpError.NotFound(`Invalid Credintials`);
    }

    const isMatch = await manager.isValidPassword(password);
    if (!isMatch) {
      throw createHttpError.Unauthorized("Invalid Credintials");
    }

    const token = signAccessToken(manager.id);

    await Manager.updateOne({ email }, {
      $push: {
        tokens: token
      }
    });

    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
});

//-----------------------------------------------> logout
router.get("/auth/logout", async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(createHttpError.Unauthorized());
    }

    const token = authHeader.split(" ").pop();
    const response = await Manager.updateOne({ tokens: { $in: token } }, {
      $pull: {
        tokens: token
      }
    });

    res.status(200).send({ response });
  } catch (error) {
    next(error);
  }
});

export default router;