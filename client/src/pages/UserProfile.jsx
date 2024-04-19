import { useSelector } from "react-redux";

export default function UserProfile() {
  const { userInfo } = useSelector((state) => state.authLogin);
  return (
      <h1 style={{textAlign: "center"}}>{userInfo ? `Welcome ${userInfo.name}` : "Welcome"}</h1>
  );
}
