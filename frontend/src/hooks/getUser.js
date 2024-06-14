import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDetailsFailure, saveUserDetailsStart, saveUserDetailsSuccess } from "../redux/user/userSlice";

export const getUser = () => {
  const { error, loading, currentUser, isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const fetchUser = async () => {
    dispatch(saveUserDetailsStart());
    try {
      const res = await axios.get(`${BASE_URL}/user`, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data?.user) {
        dispatch(saveUserDetailsSuccess(res.data.user));
      } else {
        dispatch(saveUserDetailsFailure('Failed to get user'));
      }
    } catch (error) {
      dispatch(saveUserDetailsFailure('Something Went Wrong'));
    }
  };
  return { error, loading, currentUser, fetchUser, isAuthenticated };
};
