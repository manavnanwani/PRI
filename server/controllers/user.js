import User from "../models/user.js";
import ApiCount from "../models/apiCount.js";

function calculateTime(time) {
  var seconds = (time[0] + time[1] / 1e9).toFixed(3);
  return seconds;
}

export const getCount = async (req, res) => {
  var startTime = process.hrtime();
  try {
    const existingCount = await ApiCount.find({ webId: "Manav" });
    var seconds = calculateTime(process.hrtime(startTime));
    return res.status(200).json({
      result: existingCount,
      message: `Count Fetched. Time taken : ${seconds} seconds`,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  var startTime = process.hrtime();
  try {
    const existingUsers = await User.find();
    var seconds = calculateTime(process.hrtime(startTime));
    return res.status(200).json({
      result: existingUsers,
      message: `Users Fetched. Time taken : ${seconds} seconds`,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addUser = async (req, res) => {
  var startTime = process.hrtime();
  const formData = req.body;
  try {
    // Check if any fields are empty
    if (formData.fullName === "" || formData.phone === "")
      res.status(500).json({ message: "Fields are Empty" });

    // If not, then create user
    const result = await User.create(formData);

    // Update Count
    const existingCount = await ApiCount.find({ webId: "Manav" });
    existingCount[0].count += 1;
    await ApiCount.findByIdAndUpdate(existingCount[0]._id, existingCount[0], {
      useFindAndModify: false,
    });
    var seconds = calculateTime(process.hrtime(startTime));
    return res
      .status(200)
      .json({ message: `User Added. Time taken : ${seconds} seconds` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editUser = async (req, res) => {
  var startTime = process.hrtime();
  const formData = req.body;
  try {
    // Check if any fields are empty
    if (formData.fullName === "" || formData.phone === "")
      res.status(500).json({ message: "Fields are Empty" });

    // If not, then update user
    await User.findByIdAndUpdate(formData._id, formData, {
      useFindAndModify: false,
    });

    // Update Count
    const existingCount = await ApiCount.find({ webId: "Manav" });
    existingCount[0].count += 1;
    await ApiCount.findByIdAndUpdate(existingCount[0]._id, existingCount[0], {
      useFindAndModify: false,
    });
    var seconds = calculateTime(process.hrtime(startTime));
    return res
      .status(200)
      .json({ message: `User Updated. Time taken : ${seconds} seconds` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
