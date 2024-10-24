import { useraDataObj } from "../controller/user_controller";
import User from "../models/user_schema";

const UserData = async (attributes: Array<string>, condition: any) => {
  try {
    const userDetails = await User.findOne({
      where: condition,
      attributes: attributes,
    });
    const returnData = !userDetails ? null : userDetails;
    return returnData;
  } catch (error) {
    return null;
  }
};

const CreateUser = async (User_data: any) => {
  try {
    const userDetails = await UserData(["email"], { email: User_data.email });
    if (!userDetails) {
      const Userdetail = await User.create(User_data);
      if (Userdetail) {
        return { Message: "User Has Been Created", statusCode: 200 };
      } else {
        return { Message: "Issue While creating the user", statusCode: 400 };
      }
    } else {
      return { Message: "User Already Exist", statusCode: 406 };
    }
  } catch (error) {
    return null;
  }
};

export { UserData, CreateUser };
