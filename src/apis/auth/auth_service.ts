import { Db } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { COL } from "../../config/helpers";
import { BCRYPT_CONFIG, JWT_CONFIG } from "../../config/constants";

const login = async (db: Db, body: any) => {
    const { email, password } = body;
    const user = await db.collection(COL.USERS).findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");
    
    const token = jwt.sign({ id: user._id }, JWT_CONFIG.secret, {
        expiresIn: "1d",
    });
    delete user.password;
    return { user, token };
};

const register = async (db: Db, body: any) => {
    const {
        fullname,
        email,
        password,
        role,
    } = body;

    const duplicate = await db.collection(COL.USERS).findOne({ email });

    if (duplicate) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, BCRYPT_CONFIG.saltRounds);

    const _user = {
        fullname,
        email,
        password: hashedPassword,
        role: role || "User",
    }

    const xuser = await db.collection(COL.USERS).insertOne(_user);

    const token = jwt.sign({ id: xuser.insertedId }, JWT_CONFIG.secret, {
        expiresIn: "1d",
    });

    const user:any = await db.collection(COL.USERS).findOne({ _id: xuser.insertedId });

    delete user.password;

    return { user, token };

};

export { login, register };
