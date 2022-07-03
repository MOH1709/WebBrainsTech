import { Router } from "express";
import createHttpError from "http-errors";

//-----------------------------------------------> custom imports
import { Employee, Manager } from "../models/index.js";
import Validator from "../helpers/validator.js";

const router = Router();

//-----------------------------------------------> get employees
router.get("/", async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader.split(" ").pop();
    const { id } = await Manager.findOne({ tokens: { $in: token } });

    const employees = await Employee.find({ managerId: id });

    res.status(200).send({ employees });
  } catch (error) {
    next(error);
  }
});

//-----------------------------------------------> add emploee
router.post("/add", async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const {
      name,
      email,
      phoneNumber,
      workHours,
      salaryType,
      salary,
      department,
    } = req.body;

    if (!Validator.isEmail(email)) {
      throw createHttpError.BadRequest("Invalid username or password");
    }

    const doesExist = await Employee.findOne({ email });
    if (doesExist) {
      throw createHttpError.Conflict(`${email} already exist`);
    }

    const token = authHeader.split(" ").pop();
    const { id } = await Manager.findOne({ tokens: { $in: token } });

    const emp = new Employee({
      name,
      email,
      phoneNumber,
      workHours,
      salaryType,
      salary,
      department,
      managerId: id,
    });
    await emp.save();

    res.status(200).send(emp);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//-----------------------------------------------> update emploee
router.put("/", async (req, res, next) => {
  try {
    const {
      id,
      name,
      email,
      phoneNumber,
      workHours,
      salaryType,
      salary,
      department,
    } = req.body;

    if (!Validator.isEmail(email)) {
      throw createHttpError.BadRequest("Invalid username or password");
    }

    const doesExist = await Employee.findOne({ email });
    if (!doesExist) {
      var emp = await Employee.updateOne({ id: id }, {
        $set: {
          name,
          email,
          phoneNumber,
          workHours,
          salaryType,
          salary,
          department,
        }
      });
    }

    res.status(200).send(emp);
  } catch (error) {
    next(error);
  }
});

export default router;