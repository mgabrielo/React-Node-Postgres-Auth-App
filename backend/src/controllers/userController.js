import pool from "../dbConfig/create-db.js"
import { getUserById } from "../queries/authQueries.js"

export const getUserDetails = async (req, res) => {
    const userId = req.userId
    try {
        if (!userId) {
            res.status(401).json({ message: 'Not Authorized Access' })
        }
        else {
            const exsitingUser = await pool.query(getUserById, [userId])
            if (exsitingUser?.rows?.length === 0) {
                res.status(404).json({ msg: 'User Not Found' })
            } else {
                const userDetails = exsitingUser?.rows[0]
                res.status(200).json({ user: userDetails })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
}