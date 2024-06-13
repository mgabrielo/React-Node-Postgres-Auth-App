import pool from "../database/db.js";
import { getRegisterUser, getUserByEmail } from "../queries/authQueries.js";
import { generateJWT } from "../utils/generateJWT.js";
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { username, email, password } = req.body
        const exsitingUser = await pool.query(getUserByEmail, [email])
        if (exsitingUser?.rows?.length === 0) {
            const genSalt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, genSalt)
            const newUser = await pool.query(getRegisterUser, [username, email, hashedPassword]);
            const newUserId = newUser?.rows[0].id
            if (newUserId) {
                const token = generateJWT(newUserId)
                const { id, password, ...responseUser } = newUser?.rows[0]
                return res.status(200).cookie('auth_token', token, { httpOnly: true }).json({
                    user: responseUser,
                    message: 'User Registered Successfully'
                })
            } else {
                return res.status(404).json({ message: 'user does not exist' })
            }
        } else {
            return res.status(409).json({ message: 'user already exist' })
        }

    } catch (error) {
        return res.status(500).json({ error: error?.message })
    }
}


export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const { email, password } = req.body
        const exsitingUser = await pool.query(getUserByEmail, [email])

        if (exsitingUser?.rows?.length === 0) {
            res.status(401).json({ msg: 'password or email is incorrect' })
        } else {
            const validPassword = await bcrypt.compare(password, exsitingUser?.rows[0]?.password)
            if (validPassword) {
                const token = generateJWT(exsitingUser?.rows[0].id)
                const { id, password, ...responseUser } = exsitingUser?.rows[0]
                res.status(200).cookie('auth_token', token, { httpOnly: true }).json({
                    message: 'Login Successful',
                    user: responseUser
                })
            } else {
                res.status(401).json({ msg: 'password or email is incorrect' })
            }
        }

    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}


export const logOutUser = async (req, res) => {
    try {
        res.clearCookie('auth_token').status(200).json({ message: 'User Signed out Successfully' })
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}